    var w = 500;  
    var h = 300;  

    // Create SVG container
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Define Mercator projection centered on Victoria
    var projection = d3.geoMercator()
                       .center([145, -36.51])
                       .translate([w / 2, h / 2])
                       .scale(2500);

    var path = d3.geoPath().projection(projection);

    // Define a color scale for unemployment data
    var color = d3.scaleQuantize()
                  .range([
                      "rgb(237,248,233)", 
                      "rgb(186,228,179)", 
                      "rgb(116,196,118)", 
                      "rgb(49,163,84)", 
                      "rgb(0,109,44)"
                  ]);
		//Link : https://raw.githubusercontent.com/BennyTesting/DataVisualization_Lab/refs/heads/main/Lab%208/LGA_VIC.json

    // Load unemployment data
    d3.csv("VIC_LGA_unemployment.csv").then(function(data) {
        // Set the domain of the color scale
        color.domain([
            d3.min(data, d => +d.unemployed),
            d3.max(data, d => +d.unemployed)
        ]);

        // Load GeoJSON data for LGAs
        d3.json("LGA_VIC.json").then(function(json) {
            // Merge unemployment data with GeoJSON
            for (var i = 0; i < data.length; i++) {
                var dataLGA = data[i].LGA;
                var dataValue = parseFloat(data[i].unemployed);

                for (var j = 0; j < json.features.length; j++) {
                    var jsonLGA = json.features[j].properties.LGA_name;

                    if (dataLGA == jsonLGA) {
                        json.features[j].properties.unemployed = dataValue;
                        break;
                    }
                }
            }            
            

            // Draw the map
            svg.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
               .attr("fill", function(d) {
                   var value = d.properties.unemployed;
                   return value ? color(value) : "#ccc"; // Default color if no data
               })
               .attr("stroke", "black") // Set stroke color
               .attr("stroke-width", 0.3) // Set stroke width
               .attr("opacity", 0.7); // Optional: set opacity for the stroke

            d3.csv("VIC_city.csv").then(function(cityData) {
                const tooltip = d3.select("#tooltip");

                svg.selectAll("circle")
                   .data(cityData)
                   .enter()
                   .append("circle")
                   .attr("cx", d => projection([+d.lon, +d.lat])[0])
                   .attr("cy", d => projection([+d.lon, +d.lat])[1])
                   .attr("r", 5)
                   .style("fill", "red")
                   .style("stroke", "grey")
                   .style("opacity", 0.75)
                   .on("mouseover", function(event, d) {
                    d3.select(this) // Select the current circle
                    .style("fill", "orange") // Change fill color
                    .style("stroke", "grey")
                    .attr("r", 6); // Increase radius

                    tooltip.style("visibility", "visible")
                    .text(d.place) // Display city name
                    .style("left", (event.pageX + 5) + "px") // Position the tooltip
                    .style("top", (event.pageY - 28) + "px");
                })
                    .on("mouseout", function(d) {
                        d3.select(this)
                        .style("fill", "red") // Revert fill color
                        .attr("r", 5); // Revert radius


                        tooltip.style("visibility", "hidden");
                   });
            });
        });
    });

window.onload = init;