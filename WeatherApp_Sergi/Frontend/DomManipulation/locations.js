function fetchLocation(location) {
  // if (!location) {
  //   return;
  // }
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
  if (!data) return;
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
  // console.log("Before: ", location);
  let [locationName, admin1, country] = location.split(",");
  if (country == undefined) {
    country = admin1;
    admin1 = undefined;
  }
  // console.log("ss ", locationName, admin1, country);
  return fetch(
    "https://geocoding-api.open-meteo.com/v1/search?" +
      new URLSearchParams({
        name: locationName.trim(),
        count: 10,
      })
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log("dayta", data);
      if (data.results.length == 1) return data.results;
      const results = data.results.filter((result) => {
        if (admin1) {
          return (
            result.admin1 === admin1.trim() && result.country === country.trim()
          );
        } else {
          return result.country === country.trim();
        }
      });
      // console.log("Locaion got: ", results);
      return results;
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
