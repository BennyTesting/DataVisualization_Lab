
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


// d3.select("#add").on("click", function() {
//     var newNumber = Math.floor(Math.random() * maxValue);
//     dataset.push(newNumber);

//     xScale.domain(d3.range(dataset.length));

//     var bars = svg.selectAll("rect")
//         .data(dataset)

//         bars.enter()
//             .append("rect")
//             .attr("x",w)
//             .attr("y", function(d) {
//                 return h - yScale(d);
//             })
//             .merge(bars)
//             .transition()
//             .duration(500)
//             .attr("x", function(d, i) {
//                 return xScale(i);
//             })
//             .attr("y", function(d){
//                 return h - yScale(d);
//             })
//             .attr("width", xScale.bandwidth())
//             .attr("height", function(d) {
//                 return yScale(d);
//             });

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
return h - yScale(d); // Correct height calculation
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
return h - yScale(d); // Correct height calculation
})


// // Bind new data to texts
// var texts = svg.selectAll("text")
//     .data(dataset);

// // Enter new text elements
// texts.enter()
//     .append("text")
//     .attr("fill", "black")
//     .attr("text-anchor", "middle")
//     .attr("x", function(d, i) {
//         return xScale(i) + xScale.bandwidth() / 2; // Center the text
//     })
//     .attr("y", function(d) {
//         return yScale(d) - 5; // Position above the bar
//     })
//     .text(function(d) {
//         return d; // Set text to the value
//     })
//     .merge(texts) // Update existing text
//     .transition()
//     .duration(500)
//     .attr("x", function(d, i) {
//         return xScale(i) + xScale.bandwidth() / 2; // Center the text
//     })
//     .attr("y", function(d) {
//         return yScale(d) - 5; // Position above the bar
//     })
//     .text(function(d) {
//         return d; // Update text to reflect new data
//     });
});


d3.select("#delete").on("click", function() {
// Remove the first element from the dataset
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
        


        // // Bind data to texts
        // var texts = svg.selectAll("text")
        //     .data(dataset);

        // // Exit transition for texts
        // texts.exit()
        //     .transition()
        //     .duration(500)
        //     .attr("opacity", 0) // Fade out effect
        //     .remove();

        })