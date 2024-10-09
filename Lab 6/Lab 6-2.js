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
            .domain([0, d3.max(dataset)+ 3])
            .rangeRound([h,0]);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "slategrey")

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
    })
    .on("mouseover", function (event, d) {
        var xPosition = parseFloat(d3.select(this).attr("x"));
        var yPosition = parseFloat(d3.select(this).attr("y"));

        svg.append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition + xScale.bandwidth() / 2)
        .attr("y", yPosition + 20)
        .text(d)
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle") // Center the text
        .attr("fill", "black"); // Set text color to black


        d3.select(this)
        .transition()
        .duration(200)
        .attr("fill","orange");


    })
    .on("mouseout", function (d) {
        d3.select("#tooltip").remove();
        
        d3.select(this)
        .transition()
        .duration(200)
        .attr("fill","slategrey");

    })
    .append("title") // Add title for tooltip
    .text(function(d) {
        return "This value is " + d ; // Tooltip text
    });

var AscendingSort = function () {
svg.selectAll("rect")
    .sort(function (a, b) {
        return d3.ascending(a, b);
    })
    .transition()
    .duration(1000)
    .attr("x", function(d, i) {
        return xScale(i);
    });
};

var DescendingSort = function () {
svg.selectAll("rect")
    .sort(function(a,b) {
        return d3.descending(a, b);
    })
    .transition()
    .duration(1000)
    .attr("x", function(d, i) {
        return xScale(i);
    });
};

let isAscending = true;

d3.select("#add").on("click", function() {

var newNumber = Math.floor((Math.random() * maxValue) + 1);
dataset.push(newNumber);

// Update xScale
xScale.domain(d3.range(dataset.length));

// Bind new data to bars
var bars = svg.selectAll("rect")
    .data(dataset);

// Enter new bars
bars.enter()
    .append("rect")
    .attr("x", w)
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d); 
    })
    .on("mouseover", function (event, d) {
        var xPosition = parseFloat(d3.select(this).attr("x"));
        var yPosition = parseFloat(d3.select(this).attr("y"));

        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition + xScale.bandwidth() / 2)
            .attr("y", yPosition + 20) 
            .text(d)
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle") 
            .attr("fill", "black"); 

        d3.select(this)
        .transition()
        .duration(200)
        .attr("fill","orange");
    })
    .on("mouseout", function () {
        d3.select("#tooltip").remove();

        d3.select(this)
        .transition()
        .duration(200)
        .attr("fill","slategrey");
    })            
    .merge(bars) // Update existing bars
    .transition()
    .duration(500)
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d); 
    })
});

d3.select("#delete").on("click", function() {
dataset.pop();

// Update the xScale domain
xScale.domain(d3.range(dataset.length));

// Bind updated data to the bars
var bars = svg.selectAll("rect")
    .data(dataset);

// Exit transition for bars that are removed
bars.exit()
    .transition()
    .duration(500)
    .attr("x", w)    
    .remove();

// Update existing bars
bars.transition()
    .duration(500)
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d);
    });
        
});

d3.select("#sort").on("click", function() {
    if (isAscending) {
        AscendingSort(); 
    } else {
        DescendingSort();      
    }
    isAscending = !isAscending; 
});

