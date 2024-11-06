// File path to your data
const dataFilePath = "data/cause_of_death.csv";

// Set up the chart dimensions
const margin = { top: 20, right: 120, bottom: 50, left: 60 },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// Create an SVG container for the chart
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Create scales for the chart
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

// Define color scale for different states
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Add axis groups
const xAxisGroup = svg.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${height})`);
const yAxisGroup = svg.append("g").attr("class", "y-axis");

// Tooltip
const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Load the data
d3.csv(dataFilePath).then(data => {
  // Parse the data
  data.forEach(d => {
    d.Year = +d.Year;
    d.Deaths = +d.Deaths;
    d["Age-adjusted Death Rate"] = +d["Age-adjusted Death Rate"];
  });

  // Get unique causes, states, and years
  const causes = Array.from(new Set(data.map(d => d["Cause Name"])));
  const states = Array.from(new Set(data.map(d => d.State)));
  const years = Array.from(new Set(data.map(d => d.Year))).sort((a, b) => a - b);

  // Populate cause dropdown
  const causeSelect = d3.select("#cause");
  causes.forEach(cause => causeSelect.append("option").text(cause).attr("value", cause));

  // Populate state checkboxes
  const stateCheckboxContainer = d3.select("#state-checkboxes");
  states.forEach(state => {
    const checkbox = stateCheckboxContainer.append("label").attr("class", "checkbox-label");
    const checkboxInput = checkbox.append("input")
      .attr("type", "checkbox")
      .attr("value", state)
      .attr("class", "state-checkbox");

    if (state === "United States") {
      checkboxInput.property("checked", true); // Set "United States" checkbox to be checked by default
    }

    checkbox.append("span").text(state);
  });

  // Initialize the chart with default settings
  updateChart(causes[0], ["United States"], years[0], years[years.length - 1]);

  // Event listener for cause dropdown change
  causeSelect.on("change", function() {
    updateChartWithCurrentSettings();
  });

  // Event listener for state checkbox changes
  d3.selectAll(".state-checkbox").on("change", function() {
    updateChartWithCurrentSettings();
  });

  // Helper function to get all selected states
  function getSelectedStates() {
    const selectedStates = [];
    d3.selectAll(".state-checkbox").each(function() {
      if (d3.select(this).property("checked")) {
        selectedStates.push(d3.select(this).property("value"));
      }
    });
    return selectedStates;
  }

  // Helper function to update the chart with the current selections
  function updateChartWithCurrentSettings() {
    const selectedCause = causeSelect.property("value");
    const selectedStates = getSelectedStates();
    
    // Default to the full range of available years
    const startYear = years[0];  // First year in the dataset
    const endYear = years[years.length - 1];  // Last year in the dataset
    
    updateChart(selectedCause, selectedStates, startYear, endYear);
  }

  // Update chart based on selected cause, states, and year range
  function updateChart(cause, selectedStates, startYear, endYear) {
    const filteredData = data.filter(d => d["Cause Name"] === cause &&
                                          selectedStates.includes(d.State) &&
                                          d.Year >= startYear &&
                                          d.Year <= endYear);
    const groupedData = d3.groups(filteredData, d => d.State); // Group data by state

    // Update scales
    x.domain(d3.extent(filteredData, d => d.Year));
    y.domain([0, d3.max(filteredData, d => d["Age-adjusted Death Rate"])]);

    // Update axes
    xAxisGroup.transition().duration(750).call(d3.axisBottom(x).tickFormat(d3.format("d")));
    yAxisGroup.transition().duration(750).call(d3.axisLeft(y));

    // Draw lines for each selected state with thicker lines
    svg.selectAll(".line").remove(); // Clear previous lines
    groupedData.forEach(([state, stateData]) => {
      svg.append("path")
        .datum(stateData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", color(state))
        .attr("stroke-width", 2.5) // Thicker line
        .attr("d", d3.line()
          .x(d => x(d.Year))
          .y(d => y(d["Age-adjusted Death Rate"]))
        );
    });

    // Add points with tooltips and semi-transparent fill for clarity
    svg.selectAll(".dot").remove();
    svg.selectAll(".dot")
      .data(filteredData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.Year))
      .attr("cy", d => y(d["Age-adjusted Death Rate"]))
      .attr("r", 4)
      .attr("fill", d => d3.color(color(d.State)).copy({opacity: 0.8})) // Semi-transparent
      .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Year: ${d.Year}<br>Rate: ${d["Age-adjusted Death Rate"]}<br>State: ${d.State}`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));
  }

  // X-Axis Label
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .text("Year")
    .style("font-size", "14px")
    .style("font-weight", "bold");

  // Y-Axis Label
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .text("Age-adjusted Death Rate")
    .style("font-size", "14px")
    .style("font-weight", "bold");
});