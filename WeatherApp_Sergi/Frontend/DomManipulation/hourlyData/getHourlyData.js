import { getImageForWeatherCode } from "../helpers/getWeatherCode.js";
import { formatDayTitle, formatHourlyTime } from "../helpers/helpers.js";
import { drawPlot } from "../drawPlots/drawPlots.js";
import { celsiusDegres, windSpeed } from "../helpers/getMeasurementUnits.js";

const displayHourlyData = (data, dayWanted) => {
  const cardPrevisionCards = document.querySelectorAll(
    ".card-previsio-per-hores"
  );
  // console.log("all: ", data);

  if (dayWanted) {
    // display the data based on the # day
    let index = 0;

    drawPlot(data[dayWanted].date, data[dayWanted].temperature, "temperature");
    drawPlot(data[dayWanted].date, data[dayWanted].precipitation, "rain");
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
    drawPlot(data[0].date, data[0].precipitation, "rain");
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

// Cambia onclick el dia seleccionado para las cards horarias y los gráficos
const displayHourlyDataNotCurrentDay = (data) => {
  const seeHourlyDataForDayBtns = document.querySelectorAll(".see-hourly-data");
  const dailyWeatherRows = document.querySelectorAll(".daily-weather-row");

  const clearSelectedDay = () => {
    dailyWeatherRows.forEach((row) => row.classList.remove("selected-day"));
  };

  const handleDisplayHourlyData = (order, row) => {
    clearSelectedDay();
    displayHourlyData(data, order);
    row.classList.add("selected-day");
  };

  seeHourlyDataForDayBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const row = btn.closest(".daily-weather-row");
      const order = btn.dataset.dayOrder;
      handleDisplayHourlyData(order, row);
    });
  });

  dailyWeatherRows.forEach((row) => {
    row.addEventListener("click", () => {
      const btn = row.querySelector(".see-hourly-data");
      const order = btn ? btn.dataset.dayOrder : row.dataset.dayOrder;
      handleDisplayHourlyData(order, row);
    });
  });
};

const changeChartDaySelectedFromDropdown = (daySelected) => {};

export {
  displayHourlyData,
  displayHourlyDataNotCurrentDay,
  changeChartDaySelectedFromDropdown,
};
