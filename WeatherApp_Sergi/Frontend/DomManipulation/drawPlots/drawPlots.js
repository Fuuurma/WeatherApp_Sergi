import {
  celsiusDegres,
  windSpeed,
  milliLiters,
} from "../helpers/getMeasurementUnits.js";

const drawPlot = (time, data, plotType) => {
  let selector,
    plotTitle,
    lineColor,
    lineGradient,
    measurementUnit,
    measurementLabel;

  switch (plotType) {
    case "temperature":
      selector = "#temperature-chart";
      plotTitle = "Temperature over Time";
      lineGradient = "url(#temperature-gradient)";
      measurementUnit = celsiusDegres;
      measurementLabel = `Temperature in ${celsiusDegres()}`;
      break;

    case "rain":
      selector = "#rain-chart";
      plotTitle = "Rain over Time";
      lineGradient = "url(#precipitation-gradient)";
      measurementUnit = milliLiters;
      measurementLabel = `Precipitations in ${milliLiters()}`;
      break;

    case "wind":
      selector = "#wind-chart";
      plotTitle = "Wind over Time";
      lineGradient = "url(#wind-gradient)";
      measurementUnit = windSpeed;
      measurementLabel = `Wind speed in ${windSpeed()}`;
      break;

    default:
      break;
  }

  // Remove any existing SVG element
  d3.select(selector).select("svg").remove();

  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");

  // chart dimensions
  const chartWidth = 1000;
  const chartHeight = 300;
  const margin = { top: 40, right: 20, bottom: 30, left: 40 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  // Create the SVG element
  const svg = d3
    .select(selector)
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .attr("class", "mx-auto d-block") // Centering the SVG element
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr(
      "style",
      "max-width: 100%; height: auto; height:intrinsic; width: auto;"
    );

  // Create the tooltip div
  const tooltipDiv = d3.select("#tooltip");
  const tooltip = tooltipDiv.append("div").attr("class", "tooltip");

  // Create the scales
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // Format the data
  const formattedData = data.map((value, index) => ({
    time: parseTime(time[index]),
    value: value,
  }));

  // Set the domains
  const minValue = d3.min(formattedData, (d) => d.value);
  const maxValue = d3.max(formattedData, (d) => d.value);
  x.domain(d3.extent(formattedData, (d) => d.time));
  y.domain([minValue * 0.9, maxValue * 1.1]);

  // Create the line generator
  const line = d3
    .line()
    .x((d) => x(d.time))
    .y((d) => y(d.value));

  // Add the line path with gradient color and thickness
  svg
    .append("path")
    .datum(formattedData)
    .attr("class", "line")
    .attr("d", line)
    .attr("stroke", lineGradient)
    .attr("stroke-width", 2)
    .attr("fill", "none");

  // Add the x axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .style("color", "var(--chart-outline)")
    .style("opacity", "0.75")
    .call(d3.axisBottom(x));

  // Add the y axis
  svg
    .append("g")
    .attr("class", "y axis")
    .style("color", "var(--chart-outline)")
    .style("opacity", "0.75")
    .call(
      d3.axisLeft(y).tickFormat((d) => `${d.toFixed(0)}${measurementUnit()}`)
    );

  // Add y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("color", "var(--chart-text)");
  // .text(measurementLabel);

  // Add chart title
  svg
    .append("text")
    .attr("class", "h3 m-2")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .style("text-anchor", "middle")
    .style("fill", "var(--chart-text)")
    .style("opacity", "0.75")
    .text(plotTitle);

  // Add gridlines
  const gridlines = svg
    .append("g")
    .attr("class", "grid")
    .style("color", "var(--chart-outline)")
    .style("opacity", "0.25")
    .call(d3.axisLeft().scale(y).tickSize(-width, 0, 0).tickFormat(""));

  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0, ${height})`)
    .style("color", "var(--chart-outline)")
    .style("opacity", "0.25")
    .call(d3.axisBottom().scale(x).tickSize(-height, 0, 0).tickFormat(""));

  // Add circles
  const circles = svg
    .selectAll(".dot")
    .data(formattedData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => x(d.time))
    .attr("cy", (d) => y(d.value))
    .attr("r", 5);

  // Add listening rectangle
  const listeningRect = svg
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  listeningRect.on("mousemove", function (event) {
    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector((d) => d.time).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(formattedData, x0, 1);
    const d0 = formattedData[i - 1];
    const d1 = formattedData[i];
    const d = x0 - d0.time > d1.time - x0 ? d1 : d0;
    const xPos = x(d.time);
    const yPos = y(d.value);

    // Update the circle position
    circles.attr("cx", xPos).attr("cy", yPos).attr("r", 5);

    // Add transition for the circle radius
    circles.transition().duration(50).attr("r", 5);

    // Add tooltip
    tooltipDiv
      .style("left", `${xPos}px`)
      .style("top", `calc(${yPos}px - 250px)`)
      .html(
        `<strong>Date:</strong> ${d.time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}<br><strong>Value:</strong> ${
          d.value !== undefined
            ? `${d.value.toFixed(1)}${measurementUnit()}`
            : "N/A"
        }`
      );
  });

  // listening rectangle mouse leave function
  svg.on("mouseleave", function () {
    circles.transition().duration(50).attr("r", 0);
    tooltip.style("opacity", 0);
  });
};

const togglePlots = () => {
  const chartDivs = {
    temperature: document.getElementById("temperature-chart"),
    rain: document.getElementById("rain-chart"),
    wind: document.getElementById("wind-chart"),
  };

  const btnChecks = document.querySelectorAll(".btn-check");
  btnChecks.forEach((btn) => {
    btn.addEventListener("change", () => {
      const chartToShow = btn.id;
      console.log("id: " + btn.id);
      for (const [key, value] of Object.entries(chartDivs)) {
        if (key === chartToShow) {
          value.classList.remove("d-none");
        } else {
          value.classList.add("d-none");
        }
      }
    });
  });
};

// Define gradients once in your script, outside of the drawPlot function
const defineGradients = () => {
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", 0)
    .attr("height", 0);

  svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "temperature-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .selectAll("stop")
    .data([
      { offset: "0%", color: "#ff8c00" },
      { offset: "100%", color: "#ffd700" },
    ])
    .enter()
    .append("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);

  svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "precipitation-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .selectAll("stop")
    .data([
      { offset: "0%", color: "#4a90e2" },
      { offset: "100%", color: "#87cefa" },
    ])
    .enter()
    .append("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);

  svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "wind-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%")
    .selectAll("stop")
    .data([
      { offset: "0%", color: "#6b6b66" },
      { offset: "100%", color: "#d3d3d3" },
    ])
    .enter()
    .append("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);
};

// let drawTemperaturePlot = (time, temperatures) => {
//   const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
//   // Set up the chart dimensions
//   const chartWidth = 1000;
//   const chartHeight = 300;
//   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//   const width = chartWidth - margin.left - margin.right;
//   const height = chartHeight - margin.top - margin.bottom;

//   // Create the SVG element
//   const svg = d3
//     .select("#chart")
//     .append("svg")
//     .attr("width", chartWidth)
//     .attr("height", chartHeight)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   // Create the scales
//   const x = d3.scaleTime().range([0, width]);
//   const y = d3.scaleLinear().range([height, 0]);
//   return;
// };

// let drawSurfacePressurePlot = (time, pressure) => {
//   const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
//   // Set up the chart dimensions
//   const chartWidth = 1000;
//   const chartHeight = 300;
//   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//   const width = chartWidth - margin.left - margin.right;
//   const height = chartHeight - margin.top - margin.bottom;

//   // Create the SVG element
//   const svg = d3
//     .select("#chart")
//     .append("svg")
//     .attr("width", chartWidth)
//     .attr("height", chartHeight)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   // Create the scales
//   const x = d3.scaleTime().range([0, width]);
//   const y = d3.scaleLinear().range([height, 0]);
//   return;
// };

// let drawPrecipitationPlot = (time, precipitation) => {
//   const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
//   // Set up the chart dimensions
//   const chartWidth = 1000;
//   const chartHeight = 300;
//   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//   const width = chartWidth - margin.left - margin.right;
//   const height = chartHeight - margin.top - margin.bottom;

//   // Create the SVG element
//   const svg = d3
//     .select("#chart")
//     .append("svg")
//     .attr("width", chartWidth)
//     .attr("height", chartHeight)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   // Create the scales
//   const x = d3.scaleTime().range([0, width]);
//   const y = d3.scaleLinear().range([height, 0]);
//   return;
// };

// let drawWindSpeedPlot = (time, windSpeed) => {
//   const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
//   // Set up the chart dimensions
//   const chartWidth = 1000;
//   const chartHeight = 300;
//   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//   const width = chartWidth - margin.left - margin.right;
//   const height = chartHeight - margin.top - margin.bottom;

//   // Create the SVG element
//   const svg = d3
//     .select("#chart")
//     .append("svg")
//     .attr("width", chartWidth)
//     .attr("height", chartHeight)
//     .append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   // Create the scales
//   const x = d3.scaleTime().range([0, width]);
//   const y = d3.scaleLinear().range([height, 0]);
//   return;
// };

export { drawPlot, togglePlots, defineGradients };
