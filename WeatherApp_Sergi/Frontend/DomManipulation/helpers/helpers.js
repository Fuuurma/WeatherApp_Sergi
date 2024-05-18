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
    "Diumenge",
    "Dilluns",
    "Dimarts",
    "Dimecres",
    "Dijous",
    "Divendres",
    "Dissabte",
  ];

  const monthOfTheYear = [
    "Gener",
    "Febrer",
    "Març",
    "Abril",
    "Maig",
    "Juny",
    "Juliol",
    "Agost",
    "Setembre",
    "Octubre",
    "Novembre",
    "Desembre",
  ];

  let dayInString = daysOfTheWeek[dateObject.getDay()];
  let monthInString = monthOfTheYear[month];
  return `${dayInString}, ${dayNumber} de ${monthInString}`;
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

export {
  formatDayTitle,
  formatHourlyTime,
  AIR_QUALITY_CLASSES,
  AIR_QUALITY_THRESHOLDS,
};
