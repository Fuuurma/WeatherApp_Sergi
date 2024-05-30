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
      // plotTitle = "Temperature over Time";
      lineGradient = "url(#temperature-gradient)";
      measurementUnit = celsiusDegres;
      measurementLabel = `Temperature in ${celsiusDegres()}`;
      break;

    case "rain":
      selector = "#rain-chart";
      // plotTitle = "Rain over Time";
      lineGradient = "url(#precipitation-gradient)";
      measurementUnit = milliLiters;
      measurementLabel = `Precipitations in ${milliLiters()}`;
      break;

    case "wind":
      selector = "#wind-chart";
      // plotTitle = "Wind over Time";
      lineGradient = "url(#wind-gradient)";
      measurementUnit = windSpeed;
      measurementLabel = `Wind speed in ${windSpeed()}`;
      break;

    default:
      break;
  }

  d3.select(selector).select("svg").remove();

  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M");

  const chartWidth = 1000;
  const chartHeight = 300;
  const margin = { top: 40, right: 20, bottom: 30, left: 40 };
  const width = chartWidth - margin.left - margin.right;
  const height = chartHeight - margin.top - margin.bottom;

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

  const tooltipDiv = d3.select("#tooltip").style("opacity", 0);
  const tooltip = tooltipDiv.append("div").attr("class", "tooltip");

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const formattedData = data.map((value, index) => ({
    // data
    time: parseTime(time[index]),
    value: value,
  }));

  // Rangos x, y
  const minValue = d3.min(formattedData, (d) => d.value);
  const maxValue = d3.max(formattedData, (d) => d.value);
  x.domain(d3.extent(formattedData, (d) => d.time));
  y.domain([minValue * 0.9, maxValue * 1.1]);

  const line = d3
    .line()
    .x((d) => x(d.time))
    .y((d) => y(d.value));

  svg
    .append("path")
    .datum(formattedData)
    .attr("class", "line")
    .attr("d", line)
    .attr("stroke", lineGradient)
    .attr("stroke-width", 2)
    .attr("fill", "none");

  // Añade eje X
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .style("color", "var(--chart-outline)")
    .style("opacity", "0.75")
    .call(d3.axisBottom(x));

  // Añade eje Y
  svg
    .append("g")
    .attr("class", "y axis")
    .style("color", "var(--chart-outline)")
    .style("opacity", "0.75")
    .call(
      d3.axisLeft(y).tickFormat((d) => `${d.toFixed(0)}${measurementUnit()}`)
    );

  // Y label
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
  // svg
  //   .append("text")
  //   .attr("class", "h3 m-2")
  //   .attr("x", width / 2)
  //   .attr("y", -margin.top / 2)
  //   .style("text-anchor", "middle")
  //   .style("fill", "var(--chart-text)")
  //   .style("opacity", "0.75")
  //   .text(plotTitle);

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

  // UI, Leyenda con valores respecto a la posicion del mouse.
  const circles = svg
    .selectAll(".dot")
    .data(formattedData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", (d) => x(d.time))
    .attr("cy", (d) => y(d.value))
    .attr("r", 0) // Initial radius is 0 to hide them initially
    .style("opacity", 0); // Initial opacity is 0 to hide them initially

  // Add listening rectangle
  const listeningRect = svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

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

    // Show the circle and update its position
    circles
      .attr("cx", xPos)
      .attr("cy", yPos)
      .transition()
      .duration(200)
      .attr("r", 5)
      .style("opacity", 1);

    // Show the tooltip
    tooltipDiv
      .style("opacity", 1) // Show tooltip
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

  listeningRect.on("mouseenter", function () {
    circles.transition().duration(500).attr("r", 5).style("opacity", 1);
  });

  listeningRect.on("mouseleave", function () {
    circles.transition().duration(500).attr("r", 0).style("opacity", 0);
    tooltipDiv.transition().duration(500).style("opacity", 0);
  });
};

// Permite cambiar entre los 3 gráficos
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

// Gradients para los gráficos
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

export { drawPlot, togglePlots, defineGradients };
