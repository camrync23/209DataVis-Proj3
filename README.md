# 209DataVis-Proj3
Interactive Data Visualization for Leading Causes of Death 

# Cause of Death Visualization

This visualization explores the question, *"How have causes of death evolved over time across the United States?"* The dataset includes the year, cause of death, state, number of deaths, and the age-adjusted death rate. Using D3.js, we created an interactive line graph that enables users to examine trends in causes of death across states and over time.

## Project Overview

Our objective was to design an interactive graphic addressing a compelling question using a dataset of our choice. We selected data from the U.S. Department of Health and Human Services, which tracks death rates across the U.S. based on resident death certificates. The dataset includes cause-of-death information along with demographic breakdowns by state and year.

After selecting our dataset, we explored various designs, including stacked bar charts and a choropleth map, but ultimately chose a line graph as the best fit for visualizing changes over time. The final visualization allows users to filter data by cause of death, state, and time range, providing a clear view of mortality trends.

## Rationale for Design Decisions

While considering design options, we initially experimented with a choropleth map to display the geographic distribution of deaths by state. However, we encountered challenges in adding interactive features, such as filters, which limited the map’s effectiveness in analyzing trends over time. Given our goal of visualizing changes in causes of death over multiple years, we determined that a line graph would be the most effective approach, allowing users to clearly observe trends.

For visual encoding, we used color to distinguish between states, making it easier for viewers to identify individual trends. The filters enable users to explore various causes of death across different states. Users can filter by cause of death, choose between age-adjusted death rate and number of deaths, and select a time range using drop-down menus. A state selection filter allows users to compare multiple states, with each state’s color-coded legend appearing in the “State Legend” column on the right for easy reference. We chose drop-downs and checkboxes as interaction techniques for their intuitive design, allowing users to easily select specific states and causes of death. When at least one state is selected, tooltips appear upon hovering over a data point, providing the year, metric value, and state for enhanced context.

## Development Process

Our development process began with formulating our research question, which guided our choice of visualization features and filters. Once we settled on the line graph approach, we initially displayed all states simultaneously, but this approach was visually overwhelming. To improve clarity, we introduced filters, beginning with a single-state filter and later expanding to multi-state selection to support cross-state comparisons.

For selecting the time range, we initially aimed to use a slider but switched to drop-down menus due to implementation challenges in D3.js. Drop-downs allowed us to control the time range while maintaining usability.

For the state selection, we initially used a single-column drop-down checkbox, but this layout made it cumbersome to scroll through states. To enhance ease of use, we switched to a four-column layout.

After creating the visualization, we added a brief explanation of the age-adjusted death metric and usage tips below the graphic to improve user understanding.

## Work Distribution

This project was a collaborative effort between two team members:

- **Camryn** focused on initial design, filter additions, and CSS enhancements for visual appeal.
- **Allison** contributed to the initial design, filter additions, and project write-up.

Each team member spent approximately two hours exploring visualization options before deciding on a direction. After finalizing the design, each member invested an additional four hours refining the filters, tool layout, and debugging the code. The total development time was around 12 hours, with the most time-intensive tasks involving D3.js setup for multi-filter handling and debugging.

---

This project demonstrates the power of interactive visualization in answering complex questions and providing valuable insights into public health trends across the United States.
