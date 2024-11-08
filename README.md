# 209DataVis-Proj3
Interactive Data Visualization for Leading Causes of Death 
# Cause of Death Visualization

## Project Overview
The visualization addresses the question: **"How have causes of death evolved over time across the United States?"** Our dataset includes:
- Year of death
- Type and cause of death
- State
- Number of deaths
- Age-adjusted death rate

This information allows users to explore trends in mortality across different states and over multiple years.

## Rationale for Design Decisions
Initially, we considered various design ideas, including a **choropleth map** to display the geographic distribution of deaths by state. However, challenges in integrating interactive features, such as filters with the map, limited our ability to analyze time-based trends effectively. Given our primary goal of visualizing changes in causes of death over time, we determined that a **line graph** would be the most effective approach, offering a straightforward way to observe trends.

### Visual Encodings and Interaction Techniques
To make the visualization intuitive:
- We used **color** to differentiate states, making individual trends easier to distinguish.
- **Dropdowns** and **checkboxes** were chosen as interaction techniques, allowing users to filter by specific states and causes of death for easier comparison.

## Alternatives Considered and Ultimate Choices
While we initially considered a choropleth map, interaction limitations led us to explore line graphs. Within the line graph format:
- **All states displayed simultaneously** proved visually overwhelming, prompting us to add a **single-state filter** and, later, a **multi-state filter** for comparative analysis.
- For time selection, we initially wanted a slider but opted for dropdown menus due to technical challenges in implementing a slider in D3.js. Dropdowns ultimately provided simpler control over the time range.

## Development Process Overview
Our development began by formulating our research question, guiding our selection of visualization features and filters. Initially, we experimented with different plotting libraries, including **Plotly** and **Altair**, before transitioning to **D3.js** for its flexibility. The process of adapting code between libraries presented challenges due to structural differences.

### Work Allocation and Time Investment
The work was divided between two team members:
- **Camryn** initial design, addition of filters, and enhancing CSS for visual appeal.
- **Allison** initial design, addition of filters, and the write-up.

Each member initially spent about **2 hours** exploring visualization options, followed by an additional **3 hours** developing the chosen approach. The total development time was approximately **10 hours**, with the most time-consuming tasks being:
- Adapting code from other libraries to D3.js
- Implementing the year filter

## Insights and Reflection
This project provided valuable insights into D3.js and effective ways to create interactive visualizations that answer complex questions. The resulting visualization enables users to explore how causes of death have changed over time across the U.S., providing an informative, interactive tool for public health analysis.

