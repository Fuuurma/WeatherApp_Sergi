import { displayPrecipitationMaxProb } from "./getPrecipitationProb.js";
import {
  getImageForWeatherCode,
  getWeatherCodeDescription,
} from "../helpers/getWeatherCode.js";

const currentDataManipulation = (data, units) => {
  let time,
    interval,
    temperature,
    relativeHumidity,
    weatherCode,
    surfacePressure,
    windSpeed,
    windDirection,
    precipitation;

  time = data.time;
  interval = data.interval;
  temperature = data.temperature_2m;
  relativeHumidity = data.relative_humidity_2m;
  weatherCode = data.weather_code;
  surfacePressure = data.surface_pressure;
  windSpeed = data.wind_speed_10m;
  windDirection = data.wind_direction_10m;
  precipitation = data.precipitation;

  let temperatureUnit,
    humidityUnit,
    pressureUnit,
    windSpeedUnit,
    windDirrectionUnit;

  temperatureUnit = units.temperature_2m;
  humidityUnit = units.relative_humidity_2m;
  pressureUnit = units.surface_pressure;
  windSpeedUnit = units.wind_speed_10m;
  windDirrectionUnit = units.wind_direction_10m;

  const currentTimeContainer = document.getElementById("current-time-value");

  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${day}/${month}/${year}`;
  currentTimeContainer.innerHTML = formattedTime;

  const currentTemperatureContainer = document.getElementById(
    "current-temperature-value"
  );
  currentTemperatureContainer.innerHTML = temperature + temperatureUnit;

  const currentHumidityContainer = document.getElementById(
    "current-humidity-value"
  );
  currentHumidityContainer.innerHTML = relativeHumidity + humidityUnit;

  const currentSurfacePressureContainer = document.getElementById(
    "current-pressure-value"
  );
  currentSurfacePressureContainer.innerHTML = surfacePressure + pressureUnit;

  const currentWindContainer = document.getElementById("current-wind-value");
  currentWindContainer.innerHTML = `${windSpeed}${windSpeedUnit}`;
  const currentWindImage = document.getElementById(
    "current-wind-direction-img"
  );
  currentWindImage.style.transform = `rotate(${windDirection}deg)`;

  const currentWeatherCodeImageRoute = getImageForWeatherCode(weatherCode);
  const currentWeatherCodecontainer = document.getElementById(
    "current-weather-code-img"
  );
  currentWeatherCodecontainer.src = currentWeatherCodeImageRoute;

  const weatherCodeDescriptionContainer = document.getElementById(
    "current-weather-code-description"
  );
  weatherCodeDescriptionContainer.textContent =
    getWeatherCodeDescription(weatherCode);
  displayPrecipitationMaxProb(precipitation);
};

export { currentDataManipulation };
