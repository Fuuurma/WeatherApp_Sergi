import { addSpinner, removeSpinners } from "../helpers/loadingSpinners.js";

const getGoogleResultsTemplate = () => {
  resetResultsContainer();
  fetch("../../Backend/scripts/getSearchResultsForLocation.php")
    .then((response) => response.json())
    .then((data) => {
      const resultsContainer = document.getElementById("search-results");
      resultsContainer.innerHTML = ""; // Clear loader
      data.forEach((result, index) => {
        const resultElement = document.createElement("div");
        resultElement.className = "h6";
        resultElement.innerHTML = `<a class="h6 search-results" id="search-results-${
          index + 1
        }" href="${result.url}" target="_blank">${result.title}</a>`;
        resultsContainer.appendChild(resultElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      document.getElementById("search-results").innerHTML =
        "<p>Error loading search results.</p>";
    });
};

const getGoogleResultsLocation = (location) => {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = ""; // Clear the results container
  // Add spinners
  addSpinner(resultsContainer, "text-primary", 0);
  addSpinner(resultsContainer, "text-secondary", 150);
  addSpinner(resultsContainer, "text-light", 330);

  fetch(
    `../../Backend/scripts/getSearchResultsForLocation.php?query=${encodeURIComponent(
      location
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Remove spinners
      removeSpinners(resultsContainer);

      if (Array.isArray(data)) {
        data.forEach((result, index) => {
          const resultElement = document.createElement("div");
          resultElement.className = "h6";
          resultElement.innerHTML = `<a class="h6 search-results" id="search-results-${
            index + 1
          }" href="${result.url}" target="_blank">${result.title}</a>`;
          resultsContainer.appendChild(resultElement);
        });
      } else {
        resultsContainer.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
      // Remove spinners
      removeSpinners(resultsContainer);
      resultsContainer.innerHTML = "<p>Error loading search results.</p>";
    });
};

const resetResultsContainer = () => {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = ""; // Clear the results container
};

export { getGoogleResultsTemplate, getGoogleResultsLocation };
