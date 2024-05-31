function focusWindowOnChart() {
  const chartContainer = document.getElementById("chart-container");
  if (chartContainer) {
    chartContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

let focusOnCards = () => {
  const cards = document.getElementById("cards-hourly-row");
  if (cards) {
    cards.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

export { focusWindowOnChart, focusOnCards };
