import {
  AIR_QUALITY_CLASSES,
  AIR_QUALITY_THRESHOLDS,
} from "../helpers/helpers.js";

const getAirQualityURL = (latitude, longitude) => {
  if (!latitude || !longitude) {
    return "Invalid coords.";
  }
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !isFinite(latitude) ||
    !isFinite(longitude)
  ) {
    return "Invalid type for latitude/longitude";
  }
  const url =
    "https://air-quality-api.open-meteo.com/v1/air-quality?" +
    new URLSearchParams({
      latitude,
      longitude,
      current:
        "european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index",
      hourly:
        "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index",
    });
  return url;
};

const manipulateAirQualityData = (data) => {
  const airQualityIndexBadge = document.getElementById(
    "air-quality-index-badge"
  );

  const pm25Value = document.getElementById("pm-25-value");
  const so2Value = document.getElementById("so2-value");
  const no2Value = document.getElementById("no2-value");
  const o3Value = document.getElementById("o3-value");

  getAirQualityIndexBadge(airQualityIndexBadge, data.current.european_aqi);

  pm25Value.textContent = data.current.pm2_5;
  so2Value.textContent = data.current.sulphur_dioxide;
  no2Value.textContent = data.current.nitrogen_dioxide;
  o3Value.textContent = data.current.ozone;
};

const getAirQualityIndexBadge = (element, indexValue) => {
  for (const threshold of AIR_QUALITY_THRESHOLDS) {
    if (indexValue <= threshold.threshold) {
      const classes = [
        "badge",
        "rounded-pill",
        `air-quality-${threshold.class}`,
      ];
      element.classList.remove(...classes);
      element.classList.add(...classes);
      element.textContent = threshold.text;
      break;
    }
  }
};
export { getAirQualityURL, manipulateAirQualityData };
