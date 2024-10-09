function init() {
    var w = 600;
    var h = 300;
    var padding = 20;
    var dataset;

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function(data) {
        dataset = data;

        console.table(dataset, ["date", "number"]);

        // Scales
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d) { return d.date; }),
                d3.max(dataset, function(d) { return d.date; })
            ])
            .range([padding, w - padding]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.number; })])
            .range([h - padding, padding]);

        // Line generator
        var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.number); });

        // Create SVG
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Append path
        svg.append("path")
            .datum(dataset)
            .attr("class", "line") // Make sure you have styles defined for this class
            .attr("d", line)


            var xAxis = d3.axisBottom()
            .ticks(5)
            .scale(xScale);

            var yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);

            svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")") // Move axis to the bottom
            .call(xAxis);

            svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + padding + ", 0)") // Move axis to the left
            .call(yAxis);

            svg.append("line")
            .attr("class", "line halfMilMark")
        //start of line
            .attr("x1", padding)
            .attr("y1", yScale(500000))
        //end of line
            .attr("x2", w)
            .attr("y2", yscale(500000));

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("half a million unployed");
    });
}

// Call init when the window loads
window.onload = init;
