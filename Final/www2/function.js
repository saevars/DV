require(['clusterfck'],function() {
    var hubImportance = [0.00568, 0.00887, 0.004418, 0.004628, 0.003987, 0.005227, 0.006966];

    var coords = [];
    var links = [];
    var coords3D = [];

    for (var i = 0, len = dataSet.length; i < len; i++) {
        // (note: loop until length - 1 since we're getting the next
        //  item with i+1)
        //console.log(dataSet[i].Cor1, dataSet[i].Cor2)
        links.push({
            type: "LineString",
            coordinates: [
                [dataSet[i].Cor1.x, dataSet[i].Cor1.y], [dataSet[i].Cor2.x, dataSet[i].Cor2.y]
            ]
        });
    }

    var colorScale = d3.scale.pow().domain([0, d3.max(dataSet, function (d) {
        return d.Dist;
    })]).rangeRound([0, 255]);

    var lineWidthScale = d3.scale.pow().domain([0, d3.max(dataSet, function (d) {
        return d.Dist;
    })]).rangeRound([2, 2]);

    var getColorJet = function (number) {
        //if(number<0){
        //    return "rgb("+(255+number)+","+(255+number)+",255)";
        //} else {
        return "rgb(255," + (255 - number) + "," + (255 - number) + ")";
        //}
    }

    var getRawNodes = function (nodes, projection) {
        var min_x = Number.MAX_VALUE;
        var max_x = 0;
        var min_y = Number.MAX_VALUE;
        var max_y = 0;
        var nnodes = {};

        for (var i = 0; i < nodes.length; i++) {
            var proj = projection([nodes[i].x, nodes[i].y]);
            var key = nodes[i].id - 1;
            var x = proj[0];
            var name = nodes[i].name;
            var y = proj[1];

            nnodes[key] = {'x': x, 'y': y};
            min_x = Math.min(min_x, x);
            max_x = Math.max(max_x, x);
            min_y = Math.min(min_y, y);
            max_y = Math.max(max_y, y);
        }

        var new_scale_x = d3.scale.linear().domain([min_x, max_x]).range([1000, 50]);
        var new_scale_y = d3.scale.linear().domain([min_y, max_y]).range([560, 50]);

        for (var i = 0; i < nnodes.length; i++) {
            nnodes[i].x = new_scale_x(nnodes[i].x);
            nnodes[i].y = new_scale_y(nnodes[i].y);
        }
        return nnodes;
    }

    var getResults = function (raw_edges, nnodes) {
        var eedges = [];
        for (var i = 0; i < raw_edges.length; i++) {
            eedges.push({
                'source': (raw_edges[i].Cor1.id - 1),
                'target': (raw_edges[i].Cor2.id - 1)
            });
        }

        var fbundling = d3.ForceEdgeBundling().nodes(nnodes).edges(eedges);
        var results = fbundling();

        return results;
    }

    var distScale = d3.scale.pow().domain([d3.min(dataSet, function (d) {
        return d.Dist;
    }), d3.max(dataSet, function (d) {
        return d.Dist;
    })]).range([0, 0.1]);

    var groupData = function () {
        for (var i = 0, len = gpsCoords.length; i < len; i++)
            coords3D.push([gpsCoords[i].x, gpsCoords[i].y, 0]);
    }

    var width = 1600,
        height = 900;

    var projection = d3.geo.equirectangular()
        .scale(240)
        .translate([width / 2, height / 2])
        .precision(.1);

    var path = d3.geo.path()
        .projection(projection);

    var graticule = d3.geo.graticule();

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0)

//    svg.append("rect").attr("width", width).attr("height", height);

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

    d3.json("world-50m.json", function (error, world) {
        svg.insert("path", ".graticule")
            .datum(topojson.feature(world, world.objects.land))
            .attr("class", "land")
            .attr("d", path);

        svg.insert("path", ".graticule")
            .datum(topojson.mesh(world, world.objects.countries, function (a, b) {
                return a !== b;
            }))
            .attr("class", "boundary")
            .attr("d", path);
    });

    d3.select(self.frameElement).style("height", height + "px");

    // -------------------------------------------------------------------------------------
    // And now it is time for some for some magic ! ----------------------------------------
    // -------------------------------------------------------------------------------------

    //Map out all the gps points as red circles ------------------------------------------------------

    function NewData(clusters) {

        svg.selectAll("circles.points")
            .data(gpsCoords)
            .enter()
            .append("circle")
            .attr("r", function (d, i) {
                return 1;
            })
            .attr("transform", function (d) {
                return "translate(" + projection([d.x, d.y]) + ")";
            })
            .attr("opacity", function (d, i) {
                return 1;
            })
            .style("fill", "yellow");

        // Enter the great archs of the world ! --------------------------------------------------------

//        svg.selectAll(".arc")
//                .data(links)
//                .enter()
//                .append("path")
//                .attr({'class': 'arc'})
//                .style({
//                    fill: 'none',
//                    'stroke-width': function (d, i) {
//                        return lineWidthScale(dataSet[i].Dist);
//                    },
//                    'stroke': function (d, i) {
//                        return getColorJet(colorScale(dataSet[i].Dist));
//                    }
//                })
//                .attr({d: path});

        var clusteredDataset = [];
        for (var clusterIdx = 0; clusterIdx < clusters.length; clusterIdx++) {
            var currCluster = clusters[clusterIdx];
            var clusteredById = [];
            for (var coordsIdx = 0; coordsIdx < gpsCoords.length; coordsIdx++) {
                for (var idx = 0; idx < currCluster.length; idx++) {
                    if(gpsCoords[coordsIdx].x==currCluster[idx][0] && gpsCoords[coordsIdx].y==currCluster[idx][1]) {
                        clusteredById.push(gpsCoords[coordsIdx].id);
                    }
                }
            }
            clusteredDataset.push(clusteredById);
        }

        var results = getResults(dataSet, getRawNodes(gpsCoords,projection));
        var d3line = d3.svg.line()
            .x(function(d){return d.x;})
            .y(function(d){return d.y;})
            .interpolate("linear");
        //plot the data
        for(var i = 0; i < results.length; i++){
            svg.append("path").attr("d", d3line(results[i]))
                .style("stroke-width", 1)
                .style("stroke", function () {return getColorJet(colorScale(dataSet[i].Dist));})
                .style("fill", "none")
                .style('stroke-opacity',distScale(dataSet[i].Dist));
        }
    }

    function ClearData() {
        svg.selectAll("circle").data([]).exit().remove();
        svg.selectAll(".arc").data([]).exit().remove();
    }

    groupData();

// Calculate clusters.
    var clusters = clusterfck.kmeans(coords3D, 17);
    NewData(clusters);

    for(var i = 0; i < centroids.length; i++){
        var centroidProjection = projection([centroids[i][0], centroids[i][1]]);
        svg.append("circle").attr("r", 4).attr("fill", "cyan").attr("cx", centroidProjection[0]).attr("cy", centroidProjection[1]);
    }
    console.log(clusterfck);
    console.log(clusters);
    console.log(centroids);
});