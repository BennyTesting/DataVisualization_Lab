
var w = 800;
var h = 350;
var maxValue = 25;
var barPadding = 3;

var dataset = [14, 5, 25, 23, 9, 20, 15, 25, 10, 7, 15, 21];

        
var xScale = d3.scaleBand()									
            .domain(d3.range(dataset.length))
            .rangeRound([0,w])						//changed from .range to .rangeRound (to roundoff decimal)
            .paddingInner(0.05);
            
var yScale = d3.scaleLinear()
            .domain([0,d3.max(dataset)+3])
            .rangeRound([h,0]);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "slategrey");

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d); // Correct height calculation
    });

    // svg.selectAll("text")
    // .data(dataset)
    // .enter()
    // .append("text")
    // .text(function(d) {
    //     return d;
    // })
    // .attr("fill", "black")
    // .attr("x", function(d, i) {
    //     return xScale(i) + xScale.bandwidth() / 2; // Center text in the bar
    // })
    // .attr("y", function(d) {
    //     return yScale(d) - 5; // Position text above the bar
    // })
    // .attr("text-anchor", "middle");

d3.select("#update").on("click", function() {
    var numValues = dataset.length;
    dataset = [];

    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor((Math.random() * maxValue) + 1);
        dataset.push(newNumber);
    }

// Update rectangles
svg.selectAll("rect")
    .data(dataset)
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("height", function(d) {
        return h - yScale(d); // Ensure height is correct
    });

// Update text
// svg.selectAll("text")
//     .data(dataset)
//     .text(function(d) {
//     return d;
//     })
//     .attr("fill", "black")
//     .attr("x", function(d, i) {
// 		return xScale(i) + xScale.bandwidth() / 2; // Center text in the bar
// 	})
// 	.attr("y", function(d) {
// 		return yScale(d) - 5; // Position text above the bar
// 	})
// 	.attr("text-anchor", "middle"); // Center the text

    });