
//Data from seven strawberrys

var gpsCoords = [[18.66667,57.33333],
				[100.03333,25.66667],
				[-121.9376,41.5696],
				[-81.56667,42.56667],
				[73.55,34.8],
				[132.0664,43.2272],
				[104.316666,35.46666]];


 var dataSet = [
			     {Cor1: [18.66667,57.33333], Cor2: [100.03333,25.66667] ,Dist: 0.001382},
			     {Cor1: [18.66667,57.33333], Cor2: [-121.9376,41.5696] ,Dist: 0.000706},
			     {Cor1: [18.66667,57.33333], Cor2: [-81.56667,42.56667] ,Dist: 0.000748},
			     {Cor1: [18.66667,57.33333], Cor2: [73.55,34.8] ,Dist: 0.000677},
			     {Cor1: [18.66667,57.33333], Cor2: [132.0664,43.2272] ,Dist: 0.000925},
			     {Cor1: [18.66667,57.33333], Cor2: [104.316666,35.46666] ,Dist: 0.001242},
			     {Cor1: [100.03333,25.66667], Cor2: [-121.9376,41.5696] ,Dist: 0.001344},
			     {Cor1: [100.03333,25.66667], Cor2: [-81.56667,42.56667] ,Dist: 0.001386},
			     {Cor1: [100.03333,25.66667], Cor2: [73.55,34.8] ,Dist: 0.001315},
			     {Cor1: [100.03333,25.66667], Cor2: [132.0664,43.2272] ,Dist: 0.001563},
			     {Cor1: [100.03333,25.66667], Cor2: [104.316666,35.46666] ,Dist: 0.00188},
			     {Cor1: [-121.9376,41.5696], Cor2: [-81.56667,42.56667] ,Dist: 0.000334},
			     {Cor1: [-121.9376,41.5696], Cor2: [73.55,34.8] ,Dist: 0.000407},
			     {Cor1: [-121.9376,41.5696], Cor2: [132.0664,43.2272] ,Dist: 0.000655},
			     {Cor1: [-121.9376,41.5696], Cor2: [104.316666,35.46666] ,Dist: 0.000972},
			     {Cor1: [-81.56667,42.56667], Cor2: [73.55,34.8] ,Dist: 0.000449},
			     {Cor1: [-81.56667,42.56667], Cor2: [132.0664,43.2272] ,Dist: 0.000697},
			     {Cor1: [-81.56667,42.56667], Cor2: [104.316666,35.46666] ,Dist: 0.001014},
			     {Cor1: [73.55,34.8], Cor2: [132.0664,43.2272] ,Dist: 0.000334},
			     {Cor1: [73.55,34.8], Cor2: [104.316666,35.46666] ,Dist: 0.000805},
			     {Cor1: [132.0664,43.2272], Cor2: [104.316666,35.46666] ,Dist: 0.001053}];


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
                  dataSet[i].Cor1, dataSet[i].Cor2
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