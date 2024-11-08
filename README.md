# 209DataVis-Proj3
Interactive Data Visualization for Leading Causes of Death 

# Cause of Death Visualization

This visualization addresses the question, **"How have causes of death evolved over time across the United States?"** The dataset includes the year of death, type and cause of death, state, number of deaths, and the age-adjusted death rate. Using D3.js, we created an interactive line graph to allow users to explore trends in causes of death across states and over time.

## Project Overview

The goal of this project was to visualize how causes of death have changed across U.S. states over a specific period. We initially experimented with different design ideas, including a choropleth map, but eventually decided that a line graph was the best fit for showing changes over time. The final visualization allows users to filter data by cause of death, state, and time range, providing a clear view of trends in mortality.

## Rationale for Design Decisions

At the outset, we considered various design ideas, such as a choropleth map to display the geographic distribution of deaths by state. However, we encountered challenges in integrating interactive features like filters with the map, limiting our ability to analyze trends over time. Given our primary goal of visualizing changes in causes of death over multiple years, we determined that a line graph would be the most effective approach, allowing users to see trends clearly.

For visual encodings, we used color and line thickness to distinguish between states, making it easier to identify individual trends without overwhelming the viewer. We chose dropdowns and checkboxes as interaction techniques for their intuitive nature, allowing users to easily select specific states and causes of death to compare.

## Alternatives Considered and Ultimate Choices

Initially, we considered a choropleth map but moved to line graphs to enhance time trend analysis. Within the line graph approach, we tried displaying all states simultaneously, but it was too visually overwhelming. This led us to add filters, beginning with a single-state filter and later expanding to a multi-state filter for better cross-state comparison. 

For selecting the time range, we initially wanted a slider to adjust the date range but ultimately used dropdown menus due to challenges in implementing a slider in D3.js. Dropdowns provided a simple way to control the time range while maintaining functionality.

## Development Process

Our development process started with formulating our research question, which guided our selection of visualization features and filters. Initially, we experimented with various plotting libraries, including Plotly and Altair, before transitioning to D3.js for its flexibility. Adapting code from other libraries to D3.js was challenging due to differences in library structures.

### Work Distribution

This project was a collaborative effort between two group members:
- **Camryn** initial design, addition of filters, and enhancing CSS for visual appeal.
- **Allison** initial design, addition of filters, and the write-up.

Each member spent about two hours exploring visualization options before settling on a direction. The total development time is estimated to be around 20 hours, with the most time-consuming tasks involving converting code to D3.js and implementing the year filter.

This project provided valuable insights into D3.js and effective ways to create interactive visualizations, ultimately leading to a tool that allows users to explore how causes of death have changed over time across the U.S.

## Challenges and Insights

The most significant challenges were adapting code from other libraries to D3.js and implementing the time filter. Initially, we wanted a toggle slider for selecting the time range, but we encountered difficulties achieving this in D3.js and opted for dropdown selectors. These challenges ultimately helped us better understand D3.js and enhance our technical skills in data visualization.

---

This project demonstrates the power of interactive visualization in answering complex questions and providing valuable insights into public health trends across the United States.
