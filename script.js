const width = 800;
const height = 600;

const svg = d3.select("#map")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

// Load data
d3.csv("data/cause_of_death.csv").then(data => {
    console.log(data);
    // Convert age-adjusted death rate to a number
    data.forEach(d => {
        d['Age-adjusted Death Rate'] = +d['Age-adjusted Death Rate'];
    });

    // Get unique years and causes for dropdowns
    const years = [...new Set(data.map(d => d.Year))];
    const causes = [...new Set(data.map(d => d['Cause Name']))];  // Updated here

    // Populate the year dropdown
    const yearSelect = d3.select("#year-filter");
    yearSelect.selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // Populate the cause dropdown
    const causeSelect = d3.select("#cause-filter");
    causeSelect.selectAll("option")
        .data(causes)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // Initial rendering
    drawMap(data, years[0], causes[0]);

    // Update the map on dropdown change
    yearSelect.on("change", function() {
        const selectedYear = d3.select(this).property("value");
        const selectedCause = causeSelect.property("value");
        drawMap(data, selectedYear, selectedCause);
    });

    causeSelect.on("change", function() {
        const selectedYear = yearSelect.property("value");
        const selectedCause = d3.select(this).property("value");
        drawMap(data, selectedYear, selectedCause);
    });
});

// Function to draw the map
const projection = d3.geoAlbersUsa()
    .scale(1000) // Adjust scale for your SVG size
    .translate([width / 2, height / 2]); // Center the projection

const pathGenerator = d3.geoPath().projection(projection);

function drawMap(data, selectedYear, selectedCause) {
    const filteredData = data.filter(d => d.Year === selectedYear && d['Cause Name'] === selectedCause);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(filteredData, d => d['Age-adjusted Death Rate'] || 0)]);

    // Load the GeoJSON data
    d3.json("data/us-states.json").then(geoData => {
        svg.selectAll("path")
            .data(geoData.features)
            .join("path")
            .attr("d", d3.geoPath().projection(projection)) // Use the projection here
            .attr("fill", d => {
                const stateData = filteredData.find(f => f.State === d.properties.name);
                return stateData ? colorScale(stateData['Age-adjusted Death Rate']) : "#ccc";
            })
            .attr("stroke", "#fff");

        // Tooltip logic remains the same
        svg.selectAll("path")
            .on("mouseover", (event, d) => {
                const stateData = filteredData.find(f => f.State === d.properties.name);
                if (stateData) {
                    const tooltip = d3.select("#tooltip")
                        .style("visibility", "visible")
                        .text(`State: ${stateData.State}, Rate: ${stateData['Age-adjusted Death Rate'].toFixed(2)}`);
                }
            })
            .on("mousemove", (event) => {
                d3.select("#tooltip")
                    .style("top", (event.pageY - 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", () => {
                d3.select("#tooltip").style("visibility", "hidden");
            });
    });
}