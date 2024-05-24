import { getImageForWeatherCode } from "../helpers/getWeatherCode.js";
import { formatDayTitle } from "../helpers/helpers.js";
import {
  celsiusDegres,
  directionDegres,
  windSpeed,
  milliLiters,
} from "../helpers/getMeasurementUnits.js";

const displayWeeklyWeather = (data) => {
  const cardContainer = document.getElementById("weekly-weather-card");
  const rows = cardContainer.querySelectorAll(".daily-weather-row");

  data.forEach((day, index) => {
    const row = rows[index];

    const weatherIcon = row.querySelector(".card-img");
    weatherIcon.src = getImageForWeatherCode(day.weatherCode);

    const temperature = row.querySelector(".card-text-temp");
    temperature.innerHTML = `${day.maxTemperature}${celsiusDegres()} - ${
      day.minTemperature
    }${celsiusDegres()}`;

    const rain = row.querySelector(".card-rain");
    rain.innerHTML = `${day.rainSum}${milliLiters()}`;

    const wind = row.querySelector(".card-wind");
    wind.innerHTML = `${day.windMax} ${windSpeed()} at ${
      day.windDirection
    }${directionDegres()}`;

    // Set the date
    const date = row.querySelector(".card-text-data");
    date.innerHTML = formatDayTitle(day.date);
  });
};

export { displayWeeklyWeather };
