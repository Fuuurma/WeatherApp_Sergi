// import { select } from "d3";

// import { axisBottom } from "d3";

const drawPlot = (time, data, plotType) => {
  let selector, plotTitle;

  switch (plotType) {
    case "temperature":
      selector = "#temperature-chart";
      plotTitle = "Temperature over Time";
      break;

    case "rain":
      selector = "#rain-chart";
      plotTitle = "Rain over Time";
      break;

    case "wind":
      selector = "#wind-chart";
      plotTitle = "Wind over Time";
      break;

    default:
      break;
  }

  // Remove any existing SVG element
  d3.select(selector).select("svg").remove();

  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
  // Set up the chart dimensions
  const chartWidth = 1000;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  // Create the SVG element
  const svg = d3
    .select(selector)
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
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
  x.domain(d3.extent(formattedData, (d) => d.time));
  y.domain([0, d3.max(formattedData, (d) => d.value)]);

  // Create the line generator
  const line = d3
    .line()
    .x((d) => x(d.time))
    .y((d) => y(d.value));

  // Add the line path
  svg.append("path").datum(formattedData).attr("class", "line").attr("d", line);

  // Add the x axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add the y axis
  svg
    .append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y).tickFormat(d3.format(".2f")));

  // Add y axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle");

  // Add chart title
  svg
    .append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .style("text-anchor", "middle")
    .text(plotTitle);

  // Add gridlines
  const gridlines = svg
    .append("g")
    .attr("class", "grid")
    .call(d3.axisLeft().scale(y).tickSize(-width, 0, 0).tickFormat(""));

  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0, ${height})`)
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

  // Add tooltip and mouseover/mouseout functions
  circles
    .on("mouseover", (event, d) => {
      tooltip
        .html(`${d.time.toLocaleDateString()}<br>${d.value}`)
        .style("opacity", 1)
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 20 + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

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
        `<strong>Date:</strong> ${d.time.toLocaleDateString()}<br><strong>Value:</strong> ${
          d.value !== undefined ? d.value.toFixed(1) : "N/A"
        }`
      );
  });

  // listening rectangle mouse leave function
  svg.on("mouseleave", function () {
    circles.transition().duration(50).attr("r", 0);
    tooltip.style("display", "none");
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

let drawTemperaturePlot = (time, temperatures) => {
  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
  // Set up the chart dimensions
  const chartWidth = 1000;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  // Create the SVG element
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the scales
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  return;
};

let drawSurfacePressurePlot = (time, pressure) => {
  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
  // Set up the chart dimensions
  const chartWidth = 1000;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  // Create the SVG element
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the scales
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  return;
};

let drawPrecipitationPlot = (time, precipitation) => {
  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
  // Set up the chart dimensions
  const chartWidth = 1000;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  // Create the SVG element
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the scales
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  return;
};

let drawWindSpeedPlot = (time, windSpeed) => {
  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");
  // Set up the chart dimensions
  const chartWidth = 1000;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

  // Create the SVG element
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the scales
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  return;
};

export { drawPlot, togglePlots };
