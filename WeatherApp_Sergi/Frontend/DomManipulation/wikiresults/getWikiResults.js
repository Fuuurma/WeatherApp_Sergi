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

      // Truncate the extract to a certain length
      const maxTextLength = 750;
      const truncatedExtract =
        extract.length > maxTextLength
          ? extract.substring(0, maxTextLength) + "..."
          : extract;

      // Split the extract into sentences, ensuring it doesn't split on decimal points
      const sentences = truncatedExtract.match(/[^.!\?]+[a-zA-Z]\. /g) || [
        truncatedExtract,
      ];

      // Update the UI with the Wikipedia data
      const factsContainer = document.getElementById("facts-container");
      const factsLocationTitle = document.getElementById("off-canvas-title");

      // Clear previous content
      factsContainer.innerHTML = "";
      factsLocationTitle.innerText = "";

      // Set new content
      factsLocationTitle.innerText = title;

      const factDiv = document.createElement("div");
      factDiv.className =
        "col bg-black bg-gradient mx-5 my-2 p-3 align-items-center rounded truncated-text";
      factsContainer.appendChild(factDiv);

      sentences.forEach((sentence) => {
        const sentenceParagraphElement = document.createElement("p");
        sentenceParagraphElement.className = "p";
        sentenceParagraphElement.innerText = sentence.trim();
        factDiv.appendChild(sentenceParagraphElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching Wikipedia data:", error);
    });
};

export { getWikiResults };
