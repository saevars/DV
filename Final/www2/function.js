var hubImportance = [0.00568, 0.00887, 0.004418, 0.004628, 0.003987, 0.005227, 0.006966];
var coords = [];
var links  = [];

for(var i=0, len=dataSet.length; i<len; i++){
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

var colorScale=d3.scale.pow().domain([0, d3.max(dataSet, function(d){
    return d.Dist;
})]).rangeRound([0,255]);

var lineWidthScale=d3.scale.pow().domain([0, d3.max(dataSet, function(d){
    return d.Dist;
})]).rangeRound([2,2]);

var getColorJet = function (number) {
    //if(number<0){
    //    return "rgb("+(255+number)+","+(255+number)+",255)";
    //} else {
        return "rgb(255,"+(255-number)+","+(255-number)+")";
    //}
}

var getRawNodes = function(nodes, projection) {
    var min_x = Number.MAX_VALUE;
    var max_x = 0;
    var min_y = Number.MAX_VALUE;
    var max_y = 0;
    var nnodes = {};

    for(var i = 0; i < nodes.length; i++) {
        var proj = projection([nodes[i].x, nodes[i].y]);
        var key = nodes[i].id-1;
        var x = proj[0];
        var name = nodes[i].name;
        var y = proj[1];

        nnodes[key] = {'x': x, 'y': y};
        min_x = Math.min(min_x, x);
        max_x = Math.max(max_x, x);
        min_y = Math.min(min_y, y);
        max_y = Math.max(max_y, y);
    }

    var new_scale_x = d3.scale.linear().domain([min_x, max_x]).range([1000,50]);
    var new_scale_y = d3.scale.linear().domain([min_y, max_y]).range([560,50]);

    for(var i = 0; i < nnodes.length; i++){
        nnodes[i].x = new_scale_x(nnodes[i].x);
        nnodes[i].y = new_scale_y(nnodes[i].y);
    }
    return nnodes;
}

var getResults = function(raw_edges, nnodes){
    var eedges = [];
    for(var i = 0; i < raw_edges.length; i++){
        eedges.push({'source':(raw_edges[i].Cor1.id-1),
            'target':(raw_edges[i].Cor2.id-1)});
    }

    var fbundling = d3.ForceEdgeBundling().nodes(nnodes).edges(eedges);
    var results   = fbundling();

    return results;
}

var distScale = d3.scale.pow().domain([d3.min(dataSet, function(d){
    return d.Dist;
}),d3.max(dataSet, function(d){
    return d.Dist;
})]).range([0, 0.1]);