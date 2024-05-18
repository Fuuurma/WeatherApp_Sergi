import { getImageForWeatherCode } from "../helpers/getWeatherCode.js";
import { formatDayTitle, formatHourlyTime } from "../helpers/helpers.js";
import { drawPlot } from "../drawPlots/drawPlots.js";
import { celsiusDegres, windSpeed } from "../helpers/getMeasurementUnits.js";

const displayHourlyData = (data, dayWanted) => {
  const cardPrevisionCards = document.querySelectorAll(
    ".card-previsio-per-hores"
  );

  if (dayWanted) {
    // display the data based on the # day
    let index = 0;

    drawPlot(data[dayWanted].date, data[dayWanted].temperature, "temperature");
    drawPlot(data[dayWanted].date, data[dayWanted].windDirection, "rain");
    drawPlot(data[dayWanted].date, data[dayWanted].windSpeed, "wind");

    // Update the hourly cards with the data for the first day
    cardPrevisionCards.forEach((hourlyCard) => {
      const timeValue = hourlyCard.querySelector(".card-text-hora");
      const weatherCodeIcon = hourlyCard.querySelector(".hourly-weather-icon");
      const temperatureValue = hourlyCard.querySelector(".card-text-temp");
      const windDirectionIcon = hourlyCard.querySelector(".img-vent");
      const windSpeedValue = hourlyCard.querySelector(".wind-speed");
      const dayTitle = document.getElementById("hourly-data-day-title");

      dayTitle.textContent = formatDayTitle(data[dayWanted].date[index]);
      timeValue.textContent = formatHourlyTime(data[dayWanted].date[index]);
      weatherCodeIcon.src = getImageForWeatherCode(
        data[dayWanted].weatherCode[index]
      );
      temperatureValue.textContent = `${
        data[dayWanted].temperature[index]
      } ${celsiusDegres()}`;

      windDirectionIcon.src =
        "../../Frontend/assets/images/weather_icons/direction.png";
      windDirectionIcon.style.transform = `rotate(${data[dayWanted].windDirection[index]}deg)`;
      windSpeedValue.innerHTML = `${
        data[dayWanted].windSpeed[index]
      } ${windSpeed()}`;
      index++;
    });
  } else {
    // display day #0
    let index = 0;
    drawPlot(data[0].date, data[0].temperature, "temperature");
    drawPlot(data[0].date, data[0].windDirection, "rain");
    drawPlot(data[0].date, data[0].windSpeed, "wind");

    cardPrevisionCards.forEach((hourlyCard) => {
      const timeValue = hourlyCard.querySelector(".card-text-hora");
      const weatherCodeIcon = hourlyCard.querySelector(".hourly-weather-icon");
      const temperatureValue = hourlyCard.querySelector(".card-text-temp");
      const windDirectionIcon = hourlyCard.querySelector(".img-vent");
      const windSpeedValue = hourlyCard.querySelector(".wind-speed");
      const dayTitle = document.getElementById("hourly-data-day-title");

      dayTitle.textContent = formatDayTitle(data[0].date[index]);
      timeValue.textContent = formatHourlyTime(data[0].date[index]);
      weatherCodeIcon.src = getImageForWeatherCode(data[0].weatherCode[index]);
      temperatureValue.innerHTML = `${
        data[0].temperature[index]
      } ${celsiusDegres()}`;

      windDirectionIcon.src =
        "../../Frontend/assets/images/weather_icons/direction.png";
      windDirectionIcon.style.transform = `rotate(${data[0].windDirection[index]}deg)`;
      windSpeedValue.textContent = `${data[0].windSpeed[index]} ${windSpeed()}`;
      index++;
    });
  }
};

const displayHourlyDataNotCurrentDay = (data) => {
  const seeHourlyDataForDayBtns = document.querySelectorAll(".see-hourly-data");

  seeHourlyDataForDayBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      seeHourlyDataForDayBtns.forEach((btn) => {
        btn.closest(".daily-weather-row").classList.remove("selected-day");
      });

      const order = btn.dataset.dayOrder;
      displayHourlyData(data, order);

      btn.closest(".daily-weather-row").classList.add("selected-day");
    });
  });
};

export { displayHourlyData, displayHourlyDataNotCurrentDay };
