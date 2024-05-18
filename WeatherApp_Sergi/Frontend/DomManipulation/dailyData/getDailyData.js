import { displaySunsetSunrise } from "../currentData/getSunsetSunrise.js";

const dailyDataManipulation = (dailyData, dailyDataUnits) => {
  const time = dailyData.time;
  const dailyWeatherCodes = dailyData.weather_code;
  const maxDailyTemperatures = dailyData.temperature_2m_max;
  const minDailyTemperatures = dailyData.temperature_2m_min;
  const sunrise = dailyData.sunrise;
  const sunset = dailyData.sunset;
  const rainSum = dailyData.precipitation_sum;
  const windMax = dailyData.wind_speed_10m_max;
  const windDirection = dailyData.wind_direction_10m_dominant;
  // const precipitation_probability_max = dailyData.precipitation_probability_max;
  const dailyDataObject = dailyData.time.map((_, index) => {
    return {
      date: time[index],
      weatherCode: dailyWeatherCodes[index],
      maxTemperature: maxDailyTemperatures[index],
      minTemperature: minDailyTemperatures[index],
      sunrise: sunrise[index],
      sunset: sunset[index],
      rainSum: rainSum[index],
      windMax: windMax[index],
      windDirection: windDirection[index],
      //precipitation_max_prob: precipitation_probability_max[index], // errorTypeError: Cannot read properties of undefined (reading '0')
    };
  });
  displaySunsetSunrise(dailyDataObject[0]);
  return dailyDataObject;
};

export { dailyDataManipulation };
