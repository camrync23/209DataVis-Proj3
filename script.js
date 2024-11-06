// File path to your data
const dataFilePath = "data/cause_of_death.csv";

// Set up the chart dimensions
const margin = { top: 20, right: 120, bottom: 50, left: 100 },
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
  causes.sort();  // This sorts the array of causes in ascending (alphabetical) order
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

    // Event listener for the "Select All" button
    d3.select("#select-all").on("click", function() {
      // Check all the checkboxes
      d3.selectAll(".state-checkbox").property("checked", true);
      // Update chart with the newly selected states
      updateChartWithCurrentSettings();
    });
  
    // Event listener for the "Deselect All" button
    d3.select("#deselect-all").on("click", function() {
      // Uncheck all the checkboxes
      d3.selectAll(".state-checkbox").property("checked", false);
      // Update chart with the newly selected states
      updateChartWithCurrentSettings();
    });
  
    // Existing event listener for individual state checkbox changes
    d3.selectAll(".state-checkbox").on("change", function() {
      updateChartWithCurrentSettings();
    });

  // Populate year range dropdowns (Start Year and End Year)
  const startYearSelect = d3.select("#start-year");
  const endYearSelect = d3.select("#end-year");
  years.forEach(year => {
    startYearSelect.append("option").text(year).attr("value", year);
    endYearSelect.append("option").text(year).attr("value", year);
  });

  // Set default year range (1999 to 2017)
  startYearSelect.property("value", 1999);
  endYearSelect.property("value", 2017);

  // Populate the metric dropdown
  const metricSelect = d3.select("#metric");
  metricSelect.property("value", "Age-adjusted Death Rate");

  // Initialize the chart with default settings
  updateChart("Alzheimer's disease", ["United States"], 1999, 2017, "Age-adjusted Death Rate");

  // Event listener for cause dropdown change
  causeSelect.on("change", function() {
    updateChartWithCurrentSettings();
  });

  // Event listener for state checkbox changes
  d3.selectAll(".state-checkbox").on("change", function() {
    updateChartWithCurrentSettings();
  });

  // Event listener for year range change
  startYearSelect.on("change", function() {
    updateChartWithCurrentSettings();
  });
  endYearSelect.on("change", function() {
    updateChartWithCurrentSettings();
  });

  // Event listener for metric dropdown change
  metricSelect.on("change", function() {
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
// Define a function to update the legend
// Define a function to update the legend
function updateLegend(selectedStates) {
    const legendContainer = d3.select("#legend");
  
    // Clear existing legend items
    legendContainer.selectAll("*").remove();
  
    // Create a legend item for each selected state
    selectedStates.forEach(state => {
      const legendItem = legendContainer.append("div")
        .attr("class", "legend-item")
        .style("display", "flex")
        .style("align-items", "center")
        .style("margin-bottom", "5px")
        .html(`
          <div style="width: 20px; height: 20px; background-color: ${color(state)}; margin-right: 10px;"></div>
          <span>${state}</span>
        `);
  
      // Add a click event to highlight the line when a legend item is clicked
      legendItem.on("click", function() {
        toggleHighlight(state);  // This function will highlight the corresponding line
      });
    });
  }

// Function to update the Y-axis label based on the selected metric
function updateYAxisLabel(selectedMetric) {
  const yAxisLabel = d3.select("#y-axis-label");

  // Set the Y-axis label based on the metric
  if (selectedMetric === "Age-adjusted Death Rate") {
    yAxisLabel.text("Age-adjusted Death Rate");
  } else if (selectedMetric === "Deaths") {
    yAxisLabel.text("Number of Deaths");
  }
}

  // Helper function to update the chart with the current selections
  function updateChartWithCurrentSettings() {
    const selectedCause = causeSelect.property("value");
    const selectedStates = getSelectedStates();
    const startYear = +startYearSelect.property("value");
    const endYear = +endYearSelect.property("value");
    const selectedMetric = metricSelect.property("value");
    
    updateChart(selectedCause, selectedStates, startYear, endYear, selectedMetric);

    updateYAxisLabel(selectedMetric);

    updateLegend(selectedStates);
  }

  function toggleHighlight(state) {
    // Select the corresponding trend line
    const line = svg.selectAll(".line")
      .filter(d => d[0].State === state); // Filter lines by state
  
    // Check if the line is already highlighted by checking for the class 'highlighted'
    const isHighlighted = line.classed("highlighted");
  
    if (isHighlighted) {
      // If already highlighted, remove the highlight
      line.classed("highlighted", false)
        .attr("stroke-width", 2.5)  // Reset to normal stroke width
        .attr("stroke", color(state));  // Reset to normal color
    } else {
      // Otherwise, highlight the line
      line.classed("highlighted", true)
        .attr("stroke-width", 6)  // Increase stroke width to highlight
        .attr("stroke", "black"); // Set color to orange (or any other color)
    }
  }
  
  // Update chart based on selected cause, states, year range, and metric
  function updateChart(cause, selectedStates, startYear, endYear, metric) {
    const filteredData = data.filter(d => d["Cause Name"] === cause &&
                                          selectedStates.includes(d.State) &&
                                          d.Year >= startYear &&
                                          d.Year <= endYear);
    const groupedData = d3.groups(filteredData, d => d.State); // Group data by state

    // Update scales
    x.domain(d3.extent(filteredData, d => d.Year));
    y.domain([0, d3.max(filteredData, d => d[metric])]); // Use the selected metric for the y-domain

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
          .y(d => y(d[metric])) // Use selected metric for y-values
        );
    });

    // Add points with tooltips and semi-transparent fill for clarity
    svg.selectAll(".dot").remove();
    svg.selectAll(".dot")
      .data(filteredData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.Year))
      .attr("cy", d => y(d[metric]))
      .attr("r", 4)
      .attr("fill", d => d3.color(color(d.State)).copy({opacity: 0.8})) // Semi-transparent
      .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Year: ${d.Year}<br>${metric}: ${d[metric]}<br>State: ${d.State}`)
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

// Y-Axis Label (initial setup)
  svg.append("text")
    .attr("id", "y-axis-label")  // Give it an ID for easy reference
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")  // Rotate label for Y-axis
    .attr("y", -margin.left + 40)  // Position label further left
    .attr("x", -height / 2)  // Center the label vertically
    .text("Age-adjusted Death Rate")  // Default label
    .style("font-size", "14px")
    .style("font-weight", "bold");
});