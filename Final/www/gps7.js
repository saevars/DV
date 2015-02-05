
//Data from seven strawberrys

var gpsCoords = [
    {id: 0, x: 18.66667, y: 57.33333, country: "NoName", specie:"dsadsa"},
    {id: 1, x: 100.03333, y: 25.66667, name: "NoName"},
    {id: 2, x: -121.9376, y: 41.5696, name: "NoName"},
    {id: 3, x: -81.56667, y: 42.56667, name: "NoName"},
    {id: 4, x: 73.55, y: 34.8, name: "NoName"},
    {id: 5, x: 132.0664, y: 43.2272, name: "NoName"},
    {id: 6, x: 104.316666, y: 35.46666, name: "NoName"}];

var dataSet = [
    {id: 0, Cor1: {id: 0, x: 18.66667, y: 57.33333, name: "NoName"}, Cor2: {id: 1, x: 100.03333, y: 25.66667, name: "NoName"} ,Dist: 0.001382},

    {   id: 1,
        Cor1: {id: 0, x: 18.66667, y: 57.33333, name: "NoName"},
        Cor2: {id: 2, x: -121.9376, y: 41.5696, name: "NoName"},
        Dist: 0.000706
    },

    {id: 2, Cor1: {id: 0, x: 18.66667, y: 57.33333, name: "NoName"}, Cor2: {id: 3, x: -81.56667, y: 42.56667, name: "NoName"} ,Dist: 0.000748},
    {id: 3, Cor1: {id: 0, x: 18.66667, y: 57.33333, name: "NoName"}, Cor2: {id: 4, x: 73.55, y: 34.8, name: "NoName"} ,Dist: 0.000677},
    {id: 4, Cor1: {id: 0, x: 18.66667, y: 57.33333, name: "NoName"}, Cor2: {id: 5, x: 132.0664, y: 43.2272, name: "NoName"} ,Dist: 0.000925},
    {id: 5, Cor1: {id: 0, x: 18.66667, y: 57.33333, name: "NoName"}, Cor2: {id: 6, x: 104.316666, y: 35.46666, name: "NoName"} ,Dist: 0.001242},
    {id: 6, Cor1: {id: 1, x: 100.03333, y: 25.66667, name: "NoName"}, Cor2: {id: 2, x: -121.9376, y: 41.5696, name: "NoName"} ,Dist: 0.001344},
    {id: 7, Cor1: {id: 1, x: 100.03333, y: 25.66667, name: "NoName"}, Cor2: {id: 3, x: -81.56667, y: 42.56667, name: "NoName"} ,Dist: 0.001386},
    {id: 8, Cor1: {id: 1, x: 100.03333, y: 25.66667, name: "NoName"}, Cor2: {id: 4, x: 73.55, y: 34.8, name: "NoName"} ,Dist: 0.001315},
    {id: 9, Cor1: {id: 1, x: 100.03333, y: 25.66667, name: "NoName"}, Cor2: {id: 5, x: 132.0664, y: 43.2272, name: "NoName"} ,Dist: 0.001563},
    {id: 10, Cor1: {id: 1, x: 100.03333, y: 25.66667, name: "NoName"}, Cor2: {id: 6, x: 104.316666, y: 35.46666, name: "NoName"} ,Dist: 0.00188},
    {id: 11, Cor1: {id: 2, x: -121.9376, y: 41.5696, name: "NoName"}, Cor2: {id: 3, x: -81.56667, y: 42.56667, name: "NoName"} ,Dist: 0.000334},
    {id: 12, Cor1: {id: 2, x: -121.9376, y: 41.5696, name: "NoName"}, Cor2: {id: 4, x: 73.55, y: 34.8, name: "NoName"} ,Dist: 0.000407},
    {id: 13, Cor1: {id: 2, x: -121.9376, y: 41.5696, name: "NoName"}, Cor2: {id: 5, x: 132.0664, y: 43.2272, name: "NoName"} ,Dist: 0.000655},
    {id: 14, Cor1: {id: 2, x: -121.9376, y: 41.5696, name: "NoName"}, Cor2: {id: 6, x: 104.316666, y: 35.46666, name: "NoName"} ,Dist: 0.000972},
    {id: 15, Cor1: {id: 3, x: -81.56667, y: 42.56667, name: "NoName"}, Cor2: {id: 4, x: 73.55, y: 34.8, name: "NoName"} ,Dist: 0.000449},
    {id: 16, Cor1: {id: 3, x: -81.56667, y: 42.56667, name: "NoName"}, Cor2: {id: 5, x: 132.0664, y: 43.2272, name: "NoName"} ,Dist: 0.000697},
    {id: 17, Cor1: {id: 3, x: -81.56667, y: 42.56667, name: "NoName"}, Cor2: {id: 6, x: 104.316666, y: 35.46666, name: "NoName"} ,Dist: 0.001014},
    {id: 18, Cor1: {id: 4, x: 73.55, y: 34.8, name: "NoName"}, Cor2: {id: 5, x: 132.0664, y: 43.2272, name: "NoName"} ,Dist: 0.000334},
    {id: 19, Cor1: {id: 4, x: 73.55, y: 34.8, name: "NoName"}, Cor2: {id: 6, x: 104.316666, y: 35.46666, name: "NoName"} ,Dist: 0.000805},
    {id: 20, Cor1: {id: 5, x: 132.0664, y: 43.2272, name: "NoName"}, Cor2: {id: 6, x: 104.316666, y: 35.46666, name: "NoName"} ,Dist: 0.001053}
];

var hubImportance = [0.00568, 0.00887, 0.004418, 0.004628, 0.003987, 0.005227, 0.006966];
var coords = [];
var links  = [];

for(var i=0, len=dataSet.length; i<len; i++){
    // (note: loop until length - 1 since we're getting the next
    //  item with i+1)
    console.log(dataSet[i].Cor1, dataSet[i].Cor2)
    links.push({
        type: "LineString",
        coordinates: [
            [dataSet[i].Cor1.x, dataSet[i].Cor1.y], [dataSet[i].Cor2.x, dataSet[i].Cor2.y]
        ]
    });
}

var colorScale=d3.scale.pow().domain([0, d3.max(dataSet, function(d){
    return d.Dist;
})]).rangeRound([-255,255]);

var lineWidthScale=d3.scale.pow().domain([0, d3.max(dataSet, function(d){
    return d.Dist;
})]).rangeRound([2,2]);

var getColorJet = function (number) {
    if(number<0){
        return "rgb("+(255+number)+","+(255+number)+",255)";
    } else {
        return "rgb(255,"+(255-number)+","+(255-number)+")";
    }
}

var getRawNodes = function(nodes, projection) {
    var min_x = Number.MAX_VALUE;
    var max_x = 0;
    var min_y = Number.MAX_VALUE;
    var max_y = 0;

    for(var i = 0; i < nodes.length; i++) {
        var proj = projection([nodes[i].x, nodes[i].y]);
        var key = nodes[i].id;
        var x = proj[0];
        var name = nodes[i].name;
        var y = proj[1];

        nnodes[key] = {'x': x, 'y': y};
        min_x = Math.min(min_x, x);
        max_x = Math.max(max_x, x);
        min_y = Math.min(min_y, y);
        max_y = Math.max(max_y, y);
    }

    var new_scale_x = d3.scale.linear().domain([min_x,max_x]).range([1000,50]);
    var new_scale_y = d3.scale.linear().domain([min_y, max_y]).range([560,50]);

    for(var i = 0; i < nnodes.length; i++){
        nnodes[i].x = new_scale_x(nnodes[i].x);
        nnodes[i].y = new_scale_y(nnodes[i].y);
    }
    return nnodes;
}

var getResults = function(edges, nnodes){
    var eedges = [];
    for(var i = 0; i < edges.length; i++){
        eedges.push({'source ':edges[i].Cor1.id, 'target ':edges[i].Cor2.id});
    }

    var fbundling = d3.ForceEdgeBundling().nodes(nnodes).edges(eedges);
    var results   = fbundling();

    return results;
}