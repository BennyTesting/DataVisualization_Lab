function init() {
    var w = 600;
    var h = 300;
    var padding = 30;


    var dataset;

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function(data) {
        dataset = data;

        console.table(dataset, ["date", "number"]);

        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d) { return d.date; }),
                d3.max(dataset, function(d) { return d.date; })
            ])
            .range([0, w]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.number; })])
            .range([h, 0]);

        // Line generator
        var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.number); });

        var area = d3.area()
            .x(function(d) { return xScale(d.date); })

            //base line for area shape
            .y0(function() { return yScale.range()[0]; })
            
            .y1(function(d) { return yScale(d.number); });

        // Create SVG
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w + 100)
            .attr("height", h + 20);

        // Append path
        svg.append("path")
            .datum(dataset)
            .attr("class", "area") 
            .attr("d", area)
            .attr("transform", "translate(65, 0)"); 

        var xAxis = d3.axisBottom()
            .ticks(6)
            .scale(xScale);

        var yAxis = d3.axisLeft()
            .ticks(8)
            .scale(yScale);

        svg.append("g")
            .attr("transform", "translate(65," + (h) + ")") // Move axis to the bottom
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + (padding + 35) + ", 0)") // Move axis to the left
            .call(yAxis);

        svg.append("line")
            .attr("class", "line halfMilMark")
            .attr("x1", 65) // Start at the left edge
            .attr("y1", yScale(500000))
            .attr("x2", w + 65) // End at the right edge
            .attr("y2", yScale(500000))


        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", 75) // Adjust positioning for visibility
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed");


    });
}

// Call init when the window loads
window.onload = init;
