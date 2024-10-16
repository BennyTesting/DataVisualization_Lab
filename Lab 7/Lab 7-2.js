

var w = 300;
var h = 300;

var dataset = [45, 25, 20, 10, 6, 5]

var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)


var outerRadius = w / 2;
var innerRadius = 0;            //Increase to become a Donut Pie Chart

var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

var pie = d3.pie();

var color = d3.scaleOrdinal(d3.schemeSet1);

var arcs = svg.selectAll("g.arc")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("d", function(d, i) {
                return arc(d, i);
            });

        arcs.append("text")
            .text(function(d) {
                return d.value;
            })
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            })

