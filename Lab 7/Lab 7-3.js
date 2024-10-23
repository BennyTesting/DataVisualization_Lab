
var w = 300;
var h = 300;

var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

var dataset = [
    {apples: 5, oranges: 10, grapes: 22},
    {apples: 4, oranges: 12, grapes: 28},
    {apples: 2, oranges: 19, grapes: 32},
    {apples: 7, oranges: 23, grapes: 35},
    {apples: 23, oranges: 17, grapes: 43},
];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, w])
    .padding(0.1);

var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.apples + d.oranges + d.grapes;
        })])
        .range([h, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var stack = d3.stack()
    .keys(["grapes", "oranges", "apples"]); // specify the keys to stack

var series = stack(dataset); // generate the stacked data

var groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill", function(d, i) {
                    return color(i);
                });

var rects = groups.selectAll("rect")
                .data(function(d) { return d;})
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return yScale(d[1]);
                })
                .attr("height", function(d) {
                    return yScale(d[0]) - yScale(d[1]);
                })
                .attr("width", xScale.bandwidth());

var legendKeys = ["grapes", "oranges", "apples"];

var legend = svg.append("g")
    .attr("transform", "translate(20, 20)"); // position it

// Append rectangles and text for each legend item
legendKeys.forEach((key, i) => {
    legend.append("rect")
        .attr("x", 0)
        .attr("y", i * 20) // spacing between items
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color(i)); // use the same color scale

    legend.append("text")
        .attr("x", 25) // spacing for text
        .attr("y", i * 20 + 15) // align text vertically with the rectangles
        .text(key);
});