import { getImageForWeatherCode } from "../helpers/getWeatherCode.js";
import { formatDayTitle } from "../helpers/helpers.js";
import { changeChartDaySelectedFromDropdown } from "../hourlyData/getHourlyData.js";
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
    const temperature = row.querySelector(".card-text-temp");
    const rain = row.querySelector(".card-rain");
    const wind = row.querySelector(".card-wind");
    const windImage = row.querySelector(".weekly-weather-wind-img");
    const date = row.querySelector(".card-text-data");

    weatherIcon.src = getImageForWeatherCode(day.weatherCode);

    temperature.innerHTML = `${day.minTemperature}${celsiusDegres()} - ${
      day.maxTemperature
    }${celsiusDegres()}`;

    rain.innerHTML = `${day.rainSum}${milliLiters()}`;

    wind.innerHTML = `${day.windMax} ${windSpeed()}`;

    windImage.style.transform = `rotate(${day.windDirection}deg)`;

    date.innerHTML = formatDayTitle(day.date);
  });
  getDayOptionsOnChartDropdown(data);
};

const getDayOptionsOnChartDropdown = (days) => {
  if (!days) return;
  const chartDropdown = document.getElementById("chart-dropdown");
  chartDropdown.innerHTML = "";

  days.forEach((day, index) => {
    const newListItem = document.createElement("li");
    const newAnchor = document.createElement("a");
    newAnchor.href = "#";
    newAnchor.className = "dropdown-item";
    newAnchor.textContent = formatDayTitle(day.date);
    newListItem.dataset.dayToSelect = index;

    newListItem.appendChild(newAnchor);
    chartDropdown.appendChild(newListItem);

    newListItem.addEventListener("click", () => {
      changeChartDaySelectedFromDropdown(index);
    });
  });
};

export { displayWeeklyWeather };
