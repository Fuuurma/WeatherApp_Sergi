const displaySunsetSunrise = (data) => {
  let date, precipitationMaxProb, sunrise, sunset;
  date = data.date;
  sunrise = data.sunrise;
  sunset = data.sunset;
  precipitationMaxProb = data.precipitation_max_prob;

  const sunriseContainer = document.getElementById("sunrise-value");
  const sunsetContainer = document.getElementById("sunset-value");

  const sunriseFormatted = formatTime(sunrise);
  const sunsetFormatted = formatTime(sunset);

  sunriseContainer.textContent = sunriseFormatted;
  sunsetContainer.textContent = sunsetFormatted;
};

const formatTime = (timeString) => {
  const date = new Date(timeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
export { displaySunsetSunrise };
