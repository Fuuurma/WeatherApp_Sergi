const formatHourlyTime = (fullDate) => {
  const dateObject = new Date(fullDate);
  const hour = dateObject.getHours();
  return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
};

const formatDayTitle = (fullDate) => {
  const dateObject = new Date(fullDate);
  const dayNumber = dateObject.getDate();
  const month = dateObject.getMonth();

  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let prefix =
    dayNumber % 10 === 1 && dayNumber % 100 !== 11
      ? "st"
      : dayNumber % 10 === 2 && dayNumber % 100 !== 12
      ? "nd"
      : dayNumber % 10 === 3 && dayNumber % 100 !== 13
      ? "rd"
      : "th";

  let dayInString = daysOfTheWeek[dateObject.getDay()];
  let monthInString = monthOfTheYear[month];
  return `${dayInString}, ${monthInString} ${dayNumber}${prefix}`;
};

const AIR_QUALITY_CLASSES = {
  good: "badge rounded-pill air-quality-good",
  fair: "badge rounded-pill air-quality-fair",
  moderate: "badge rounded-pill air-quality-moderate",
  poor: "badge rounded-pill air-quality-poor",
  veryPoor: "badge rounded-pill air-quality-very-poor",
  extremelyPoor: "badge rounded-pill air-quality-extremely-poor",
};

const AIR_QUALITY_THRESHOLDS = [
  { threshold: 20, class: "good", text: "Good" },
  { threshold: 40, class: "fair", text: "Fair" },
  { threshold: 60, class: "moderate", text: "Moderate" },
  { threshold: 80, class: "poor", text: "Poor" },
  { threshold: 100, class: "veryPoor", text: "Very Poor" },
  { threshold: 999, class: "extremelyPoor", text: "Extremely Poor" },
];

const searchInput = document.querySelector("#searchLocation");
const chartSearchInput = document.querySelector("#chart-searchLocation");
let clearInputs = () => {
  searchInput.value = "";
  chartSearchInput.value = "";
};

function checkAndDeleteGeoLocationIcon() {
  const buttonContainer = document.getElementById("now-card-icons-container");
  const existingButton = document.getElementById("geo-location-btn");
  if (existingButton) buttonContainer.removeChild(existingButton);
}

function createGeoLocationButton() {
  checkAndDeleteGeoLocationIcon();
  const buttonContainer = document.getElementById("now-card-icons-container");
  const geoLocationButton = document.createElement("button");
  geoLocationButton.type = "button";
  geoLocationButton.className = "btn btn-sm btn-secondary rounded-pill";
  geoLocationButton.id = "geo-location-btn";
  geoLocationButton.innerHTML = '<i class="bi bi-crosshair"></i>';
  buttonContainer.appendChild(geoLocationButton);
}

export {
  formatDayTitle,
  formatHourlyTime,
  AIR_QUALITY_CLASSES,
  AIR_QUALITY_THRESHOLDS,
  clearInputs,
  checkAndDeleteGeoLocationIcon,
  createGeoLocationButton,
};
