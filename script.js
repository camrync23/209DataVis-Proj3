d3.csv("data/cause_of_death.csv").then((data) => {
    const years = [ ...new Set(data.map(d => d.Year)) ];
    const causes = [ ...new Set(data.map(d => d.Cause Name)) ];

    d3.select("#year-filter")
        .selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .text((d) => d)
        .attr("value", (d) => d);

    d3.select("#cause-filter")
        .selectAll("option")
        .data(causes)
        .enter()
        .append("option")
        .text((d) => d)
        .attr("value", (d) => d);

    drawMap(data, years[0], causes[0]);
});

function drawMap(data, selectedYear, selectedCause) {
    const filteredData = data.filter(d => d.Year == selectedYear && d["Cause Name"] == selectedCause);
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(filteredData, d => +d["Age-adjusted Death Rate"])]);

    d3.json("data/us_states.json").then((geoData) => {
        svg.selectAll("path")
            .data(geoData.features)
            .join("path")
            .attr("d", d3.geoPath())
            .attr("fill", d => {
                const stateData = filteredData.find(f => f.State == d.properties.name); 
                return stateData ? colorScale(stateData["Age-adjusted Death Rate"]) : "#ccc";
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
        
        svg.selectAll("path")
            .on("mouseover", (event, d) => {
                const stateData = filteredData.find(f => f.State == d.properties.name);
                if (stateData) {
                    const tooltip = d3.select("#tooltip");
                    tooltip.text(`State: ${stateData.State}\nDeath Rate: ${stateData["Age-adjusted Death Rate"]}`);
                    tooltip.style("opacity", 1);
                }
            })
            .on("mousemove", (event) => {
                d3.select("#tooltip")
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY + 10}px`);
            })
            .on("mouseout", () => {
                d3.select("#tooltip").style("visibility", "hidden");
            });
    });
}