const getImageForWeatherCode = (weatherCode) => {
  const route = "../assets/images/weather_icons/";
  // "http://localhost/WeatherApp/Frontend/assets/images/weather_icons/";

  // const route = "../assets/images/weather_icons/";
  const fileType = ".png";
  let weatherImageFileName;
  switch (weatherCode) {
    case 0: // soleado claro
      weatherImageFileName = "01";
      break;

    case 1: // soleado ligeramente nublado
    case 2:
    case 3:
      weatherImageFileName = "02";
      break;

    case 51: // nublado
    case 53:
    case 55:
    case 56:
    case 57:
    case 55:
    case 55:
      weatherImageFileName = "03";
      break;

    case 61: // lluvia
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      weatherImageFileName = "10";
      break;

    case 71: // nieve
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      weatherImageFileName = "13";
      break;

    case 95: // tormenta
    case 96:
    case 99:
      weatherImageFileName = "11";
      break;

    case 45: // niebla
    case 48:
      weatherImageFileName = "50";
      break;

    default:
      weatherImageFileName = "01";
      break;
  }

  let interval = "d";
  // interval = hour
  let finalPath = route + weatherImageFileName + interval + fileType;
  return finalPath;
};

const getWeatherCodeDescription = (weatherCode) => {
  let weatherCodeDescription;

  switch (weatherCode) {
    case 0: // soleado claro
      weatherCodeDescription = "Clear sky";
      break;

    case 1: // soleado ligeramente nublado
    case 2:
    case 3:
      weatherCodeDescription = "Partly cloudy";
      break;

    case 51: // nublado
    case 51:
      weatherCodeDescription = "Drizzle, light intensity";
      break;
    case 53:
      weatherCodeDescription = "Drizzle, moderate intensity";
      break;
    case 55:
      weatherCodeDescription = "Drizzle, dense intensity";
      break;

    case 56:
    case 57:
      weatherCodeDescription = "Freezing Drizzle";
      break;

    case 61: // lluvia
      weatherCodeDescription = "Rain, slight intensity";
      break;
    case 63:
      weatherCodeDescription = "Rain, moderate intensity";
      break;
    case 65:
      weatherCodeDescription = "Rain, heavy intensity";
      break;

    case 66:
      weatherCodeDescription = "Freezing rain, light intensity";
      break;
    case 67:
      weatherCodeDescription = "Freezing rain, heavy intensity";
      break;

    case 71: // nieve
      weatherCodeDescription = "Snow fall, slight intensity";
      break;
    case 73:
      weatherCodeDescription = "Snow fall, moderate intensity";
      break;
    case 75:
      weatherCodeDescription = "Snow fall, heavy intensity";
      break;

    case 77: // nieve
      weatherCodeDescription = "Snow grains";
      break;

    case 80:
      weatherCodeDescription = "Rain showers, slight";
      break;
    case 81:
      weatherCodeDescription = "Rain showers, moderate";
      break;
    case 82:
      weatherCodeDescription = "Rain showers, violent";
      break;

    case 85:
      weatherCodeDescription = "Snow showers, slight";
      break;
    case 86:
      weatherCodeDescription = "Snow showers, heavy";
      break;

    case 95: // tormenta
      weatherCodeDescription = "Thunderstorm";
      break;

    case 96:
      weatherCodeDescription = "Thunderstorm, slight hail";
      break;

    case 99:
      weatherCodeDescription = "Thunderstorm, heavy hail";
      break;

    case 45: // niebla
    case 48:
      weatherCodeDescription = "Foggy";
      break;

    default:
      weatherCodeDescription = "No description for wather code";
      break;
  }

  return weatherCodeDescription;
};

export { getImageForWeatherCode, getWeatherCodeDescription };
