let getWikiResults = (location) => {
  if (!location) location = "Barcelona";
  fetch(
    `../../Backend/scripts/getWikiresults.php?location=${encodeURIComponent(
      location
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching Wikipedia data:", data.error);
        return;
      }
      const title = data.title;
      const extract = data.extract;

      // Split the extract into sentences
      //   const sentences = extract.match(/[^\.!\?]+[\.!\?]+/g) || [];

      // Update the UI with the Wikipedia data
      const factsContainer = document.querySelector("#facts-container");
      factsContainer.innerHTML = ""; // Clear previous facts

      const factDiv = document.createElement("div");
      factDiv.className =
        "col bg-black bg-gradient mx-5 my-2 p-3 align-items-center rounded";
      factDiv.innerText = extract;
      factsContainer.appendChild(factDiv);
    })
    .catch((error) => {
      console.error("Error fetching Wikipedia data:", error);
    });
};

export { getWikiResults };
