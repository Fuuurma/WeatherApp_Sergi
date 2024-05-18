const displayPrecipitationMaxProb = (precipitationMaxProb) => {
  let precipitationMaxProbContainer = document.getElementById(
    "max-probability-precipitation-value"
  );
  precipitationMaxProbContainer.textContent = `${precipitationMaxProb} %`;
};

export { displayPrecipitationMaxProb };
