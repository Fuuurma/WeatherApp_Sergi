/* 
  TODO: 
    Format UI, Actual time Crad, data title values, 7 week forecast
    Geolocation, 
    User auth, PHP & Database
    User Fav Locations
    Drag Animation for scroll hourlyData
    Mobile. Responsive UI
    Color pallette
    Clean out, refactor
*/

import { currentDataManipulation } from "./currentData/getCurrentData.js";
import { displayWeeklyWeather } from "./weeklyForecast/getWeeklyData.js";
import { dailyDataManipulation } from "./dailyData/getDailyData.js";
import {
  displayHourlyData,
  displayHourlyDataNotCurrentDay,
} from "./hourlyData/getHourlyData.js";

import { togglePlots } from "../DomManipulation/drawPlots/drawPlots.js";

const manipulateData = (data) => {
  let dailyData,
    dailyDataUnits,
    hourlyData,
    hourlyDataUnits,
    currentData,
    currentDataUnits;

  currentData = data.current;
  currentDataUnits = data.current_units;
  currentDataManipulation(currentData, currentDataUnits);

  dailyData = data.daily;

  dailyDataUnits = data.daily_units;
  let orderedData = dailyDataManipulation(dailyData, dailyDataUnits);
  displayWeeklyWeather(orderedData);

  hourlyData = data.hourly;

  hourlyDataUnits = data.hourly_units;
  let hourlyOrderedData = hourlyDataManipulation(hourlyData, hourlyDataUnits);
  displayHourlyData(hourlyOrderedData);
  displayHourlyDataNotCurrentDay(hourlyOrderedData);
  togglePlots();
};

const hourlyDataManipulation = (hourlyData, units) => {
  const hourTime = hourlyData.time; // every 24 is 1 day -> 168 total
  const weatherCode = hourlyData.weather_code;
  const precipitation = hourlyData.precipitation_probability;
  const rain = hourlyData.rain;
  //const relativeHumidity2m = hourlyData.relative_humidity_2m;
  const surfacePressure = hourlyData.surface_pressure;
  const temperature = hourlyData.temperature_2m;
  const windDirection = hourlyData.wind_direction_10m;
  const windSpeed = hourlyData.wind_speed_10m;

  const temperatureUnit = units.temperature_2m;
  const humidityUnit = units.relative_humidity_2m;
  const pressureUnit = units.surface_pressure;
  const windSpeedUnit = units.wind_speed_10m;
  const windDirrectionUnit = units.wind_direction_10m;

  const groupedData = hourTime.reduce((acc, curr, index) => {
    const dayIndex = Math.floor(index / 24);

    if (!acc[dayIndex]) {
      acc[dayIndex] = {
        hourTime: [],
        weatherCode: [],
        temperature: [],
        rain: [],
        precipitation: [],
        // relativeHumidity: [],
        surfacePressure: [],
        windDirection: [],
        windSpeed: [],
      };
    }

    acc[dayIndex].hourTime.push(curr);
    acc[dayIndex].weatherCode.push(weatherCode[index]);
    acc[dayIndex].temperature.push(temperature[index]);
    acc[dayIndex].rain.push(rain[index]);
    acc[dayIndex].precipitation.push(precipitation[index]);
    // acc[dayIndex].relativeHumidity.push(relativeHumidity[index]);
    acc[dayIndex].surfacePressure.push(surfacePressure[index]);
    acc[dayIndex].windDirection.push(windDirection[index]);
    acc[dayIndex].windSpeed.push(windSpeed[index]);

    return acc;
  }, []);

  const fullDataWeekly = groupedData.map((day, index) => {
    const dayData = {
      date: day.hourTime,
      weatherCode: day.weatherCode,
      temperature: day.temperature,
      rain: day.rain,
      precipitation: day.precipitation,
      surfacePressure: day.surfacePressure,
      windDirection: day.windDirection,
      windSpeed: day.windSpeed,
    };
    return dayData;
  });
  return fullDataWeekly;
};

const updateLocationTitle = (location) => {
  const locationName = location[0]?.name || "";
  const province = location[0]?.admin1 || "";
  const country = location[0]?.country || "";
  document.getElementById(
    "curent-location-value"
  ).textContent = `${locationName}, ${province}, ${country}`;
};
export { manipulateData, updateLocationTitle };
