import { manipulateData } from "./manipulateData.js";
import {
  getAirQualityURL,
  manipulateAirQualityData,
} from "./airQuality/getAirquality.js";

function fetchMeteo(latitude, longitude) {
  fetch(buildURL(latitude, longitude))
    .then((response) => response.json())
    .then((data) => manipulateData(data))
    .catch((error) => console.log(error));

  const airQualityURL = getAirQualityURL(latitude, longitude);
  if (
    typeof airQualityURL === "string" &&
    airQualityURL.startsWith("Invalid")
  ) {
    console.log(airQualityURL);
    return;
  }
  fetch(airQualityURL)
    .then((response) => response.json())
    .then((data) => manipulateAirQualityData(data))
    .catch((error) => console.log(error));
}
function buildURL(latitude, longitude) {
  // URL para trabajr todos con ella
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant`;
  // const url = `https://api.open-meteo.com/v1/forecast?latitude=41.390205&longitude=2.154007&daily=sunrise,sunset,precipitation_probability_max`
  return url;
}
export { fetchMeteo };

// const url =
//   "https://api.open-meteo.com/v1/forecast?" +
//   new URLSearchParams({
//     // Default location: Barcelona, Spain
//     latitude: 41.390205,
//     longitude: 2.154007,
//     hourly:
//       "temperature_2m,relative_humidity_2m,is_day,precipitation,surface_pressure,wind_speed_10m,wind_direction_10m",
//     daily: "sunrise,sunset,precipitation_probability_max",
//   });
