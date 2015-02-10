require(['clusterfck'],function() {
    var hubImportance = [0.00568, 0.00887, 0.004418, 0.004628, 0.003987, 0.005227, 0.006966];

    var coords = [];
    var links = [];
    var coords3D = [];

    //for (var i = 0, len = dataSet.length; i < len; i++) {
    //    // (note: loop until length - 1 since we're getting the next
    //    //  item with i+1)
    //    //console.log(dataSet[i].Cor1, dataSet[i].Cor2)
    //    links.push({
    //        type: "LineString",
    //        coordinates: [
    //            [dataSet[i].Cor1.x, dataSet[i].Cor1.y], [dataSet[i].Cor2.x, dataSet[i].Cor2.y]
    //        ]
    //    });
    //}
    var colorScale = d3.scale.category10().domain([d3.min(dataSet, function(d){
        return d.Dist;
    }), d3.max(dataSet, function(d){
        return d.Dist;
    })]).range(["blue", "red"]);

    var lineWidthScale = d3.scale.pow().domain([0, d3.max(dataSet, function (d) {
        return d.Dist;
    })]).rangeRound([2, 2]);

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

    var distScale = d3.scale.linear().domain([d3.min(dataSet, function (d) {
        return d.Dist;
    }), d3.max(dataSet, function (d) {
        return d.Dist;
    })]).range([0.05, 0.1]);

    var groupData = function () {
        for (var i = 0; i < gpsCoords.length; i++)
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

    svg.append("rect").attr("width", width).attr("height", height);

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

        var auxCoords = gpsCoords.slice();
        var clusteredDataset = [];
        for (var clusterIdx = 0; clusterIdx < clusters.length; clusterIdx++) {
            var currCluster = clusters[clusterIdx];
            var clusteredById = [];
            var coordsLen = auxCoords.length;
            for (var idx = 0; idx < currCluster.length; idx++) {
                for (var coordsIdx = 0; coordsIdx < coordsLen; coordsIdx++) {
                    if(auxCoords[coordsIdx].x==currCluster[idx][0] && auxCoords[coordsIdx].y==currCluster[idx][1]) {
                        clusteredById.push(auxCoords[coordsIdx].id);
                        auxCoords.splice(coordsIdx, 1);
                        coordsIdx--;
                        coordsLen--;
                    }
                }
            }
            clusteredDataset.push(clusteredById);
        }

        var counter = 0;
        var clusteredEdges = [];
        for (var clusterIdx = 0; clusterIdx< clusteredDataset.length; clusterIdx++){
            var currCluster = clusteredDataset[clusterIdx];
            var linksCluster = [];
            var clusterLength = currCluster.length;
            for(var sourceIdx = 0; sourceIdx < clusterLength; sourceIdx++){
                for(var targetIdx = 0; targetIdx < clusterLength ; targetIdx++){
                    if(targetIdx==sourceIdx){
                        continue;
                    }
                    for(var dataIdx = 0; dataIdx < dataSet.length; dataIdx++){
                        if(dataSet[dataIdx].Cor1.id==currCluster[sourceIdx] && dataSet[dataIdx].Cor2.id==currCluster[targetIdx]){
                            linksCluster.push(dataSet[dataIdx]);
                            //linksCluster.Cor1.id--;
                            //linksCluster.Cor2.id--;
                        }
                        counter++;
                    }
                }
            }
            clusteredEdges.push(linksCluster);
        }

        clusterDistanceMatrix = [];
        var counter = 0;
        for(var sourceIdx = 0; sourceIdx < clusteredDataset.length; sourceIdx++) {
            var sourceCluster = clusteredDataset[sourceIdx];
            for(var targetIdx = 0; targetIdx < clusteredDataset.length; targetIdx++) {
                if(targetIdx==sourceIdx) {
                    continue;
                }
                var targetCluster = clusteredDataset[targetIdx];
                var connectionsStrength = 0;
                var cnt = 0;
                for(var sourceElemIdx = 0; sourceElemIdx < sourceCluster.length; sourceElemIdx++){
                    var startIdx = 0;
                    for(var targetElemIdx = 0; targetElemIdx < targetCluster.length; targetElemIdx++) {
                        for (var idx = startIdx; idx < dataSet.length; idx++) {
                            //counter++;
                            if (dataSet[idx].Cor1.id == sourceCluster[sourceElemIdx] && dataSet[idx].Cor2.id == targetCluster[targetElemIdx]) {
                                startIdx = idx;
                                connectionsStrength += dataSet[idx].Dist;
                                cnt++;
                            }
                        }
                    }
                }
                var conNorm = 0;
                if(cnt!=0){
                    conNorm = connectionsStrength/cnt;
                }
                clusterDistanceMatrix.push([sourceIdx, targetIdx, conNorm]);
            }
        }

        for(var idx = 0; idx < clusteredEdges.length; idx++) {

            var results = getResults(clusteredEdges[idx], getRawNodes(gpsCoords, projection));
            var d3line = d3.svg.line()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                })
                .interpolate("linear");
            //plot the data
            for (var i = 0; i < results.length; i++) {
                svg.append("path").attr("d", d3line(results[i]))
                    .style("stroke-width", 1)
                    .style("stroke", function () {
                        return colorScale(dataSet[i].Dist);
                    })
                    .style("fill", "none")
                    .style('stroke-opacity', distScale(dataSet[i].Dist));
            }
        }

        //Enter the great archs of the world ! --------------------------------------------------------

        var links = [];

        for(var idx = 0; idx < clusterDistanceMatrix.length; idx++){
            //links.push(projection([centroids[clusterDistanceMatrix[idx][0]],centroids[clusterDistanceMatrix[idx][1]]]));
                links.push({
                    type: "LineString",
                    coordinates: [
                        [centroids[clusterDistanceMatrix[idx][0]][0], centroids[clusterDistanceMatrix[idx][0]][1]],
                        [centroids[clusterDistanceMatrix[idx][1]][0], centroids[clusterDistanceMatrix[idx][1]][1]]
                    ]
                });
        }
        svg.selectAll(".arc")
                .data(links)
                .enter()
                .append("path")
                .attr({'class': 'arc'})
                .style({
                    fill: 'none',
                    'stroke-width': 2,
                    'stroke': function (d, i) {
                        //return "red"
                        return colorScale(clusterDistanceMatrix[i][2]);
                    }
                })
                .attr({d: path});
    }

    function ClearData() {
        svg.selectAll("circle").data([]).exit().remove();
        svg.selectAll(".arc").data([]).exit().remove();
    }

    groupData();

// Calculate clusters.
    var clusters = clusterfck.kmeans(coords3D,7);
    NewData(clusters);

    for(var i = 0; i < centroids.length; i++){
        var centroidProjection = projection([centroids[i][0], centroids[i][1]]);
        svg.append("circle").attr("r", 3).attr("fill", "cyan").attr("cx", centroidProjection[0]).attr("cy", centroidProjection[1]);
        svg.append("circle").attr("r", 2).attr("fill", "green").attr("cx", centroidProjection[0]).attr("cy", centroidProjection[1]);
        svg.append("circle").attr("r", 1).attr("fill", "blue").attr("cx", centroidProjection[0]).attr("cy", centroidProjection[1]);
    }
    console.log(clusterfck);
    console.log(clusters);
    console.log(centroids);
});