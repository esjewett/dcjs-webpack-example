var dc = require('dc')
var crossfilter = require('crossfilter2')

var chart = dc.barChart("#dc-chart");
d3.csv("morley.csv", function(error, experiments) {
  experiments.forEach(function(x) {
    x.Speed = +x.Speed;
  });
  var ndx                 = crossfilter(experiments),
      runDimension        = ndx.dimension(function(d) {return +d.Run;}),
      speedSumGroup       = runDimension.group().reduceSum(function(d) {return d.Speed * d.Run / 1000;});
  chart
    .width(768)
    .height(480)
    .x(d3.scale.linear().domain([6,20]))
    .brushOn(false)
    .yAxisLabel("This is the Y Axis!")
    .dimension(runDimension)
    .group(speedSumGroup)
    .on('renderlet', function(chart) {
        chart.selectAll('rect').on("click", function(d) {
            console.log("click!", d);
        });
    });
    chart.render();
});
