function init() {
    var w = 500;  // Adjust the width
    var h = 300;  // Adjust the height

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
            data.forEach(function(d) {
                var dataLGA = d.LGA;
                var dataValue = parseFloat(d.unemployed);

                // Find the corresponding LGA in GeoJSON
                json.features.forEach(function(feature) {
                    if (feature.properties.LGA_name === dataLGA) {
                        feature.properties.unemployed = dataValue;
                    }
                });
            });

            // Draw the map
            svg.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
               .attr("fill", function(d) {
                   var value = d.properties.unemployed;
                   return value ? color(value) : "#ccc"; // Default color if no data
               });

            // Load city data and add circles
            d3.csv("VIC_city.csv").then(function(cityData) {
                svg.selectAll("circle")
                   .data(cityData)
                   .enter()
                   .append("circle")
                   .attr("cx", d => projection([+d.lon, +d.lat])[0])
                   .attr("cy", d => projection([+d.lon, +d.lat])[1])
                   .attr("r", 5)
                   .style("fill", "red")
                   .style("opacity", 0.75);
                        });
                    });
                });
}

window.onload = init;