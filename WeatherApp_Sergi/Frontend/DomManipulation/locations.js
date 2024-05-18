function fetchLocation(location) {
  return fetch(
    "https://geocoding-api.open-meteo.com/v1/search?" +
      new URLSearchParams({
        name: location,
        count: 10,
        language: "en",
        format: "json",
      })
  )
    .then((response) => response.json())
    .then((data) => updateSuggestions(data.results))
    .catch((error) => console.log(error));
}

function updateSuggestions(data) {
  let datalist = document.querySelector("#suggestions");
  datalist.innerHTML = "";
  data.forEach((item, index) => {
    let option = document.createElement("option");
    if (item.admin1 !== "" && item.admin1 !== undefined) {
      option.value = `${item.name}, ${item.admin1}, ${item.country}`;
    } else {
      option.value = `${item.name}, ${item.country}`;
    }
    datalist.appendChild(option);
  });
}

function getLocation(location) {
  const locationName = location.split(",")[0];
  return fetch(
    "https://geocoding-api.open-meteo.com/v1/search?" +
      new URLSearchParams({
        name: locationName,
        count: 1,
      })
  )
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    })
    .catch((error) => console.log(error));
}

function reverseGeocoding(lat, lon) {
  let apiData = fetch(
    "http://api.openweathermap.org/geo/1.0/reverse?" +
      new URLSearchParams({
        lat: lat,
        lon: lon,
        limit: 1,
        appid: "1159a738a336bcc37eca65bc1acc4f11",
      })
  );
  return apiData;
}

const defaultLocation = [
  {
    latitude: 41.3888,
    longitude: 2.159,
    name: "Barcelona",
    admin1: "Catalonia",
    country: "Spain",
    isFavorite: true,
  },
];

export {
  fetchLocation,
  updateSuggestions,
  getLocation,
  reverseGeocoding,
  defaultLocation,
};
