function focusWindowOnChart() {
  const chartContainer = document.getElementById("chart-container");
  if (chartContainer) {
    chartContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export { focusWindowOnChart };
