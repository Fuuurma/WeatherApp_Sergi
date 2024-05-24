import {
  fetchLocation,
  getLocation,
  reverseGeocoding,
  defaultLocation,
} from "./locations.js";
import { defineGradients } from "./drawPlots/drawPlots.js";
import { focusWindowOnChart } from "./drawPlots/focusOnChart.js";
import { fetchMeteo } from "./meteoApi.js";
import { manipulateData, updateLocationTitle } from "./manipulateData.js";
import { refreshDashboard, refreshSuggestions } from "./refresh/refresh.js";
import {
  requestLogin,
  requestLogout,
  checkLogin,
  loggedIn,
  createUser,
} from "./auth/login.js";

import {
  requestUploadPhoto,
  addFavorite,
  refreshPhotos,
  getFavorites,
} from "./favorites/favorites.js";

import { makeCardsMoveAndBeDraggable } from "../DomManipulation/helpers/makeCardsDraggble.js";

import { getWikiResults } from "../DomManipulation/wikiresults/getWikiResults.js";
import { signUpNewUser } from "../DomManipulation/auth/signUp.js";
import {
  getGoogleResultsLocation,
  getGoogleResultsTemplate,
} from "../DomManipulation/googleResults/getGoogleResults.js";

let targetLocation = null;

document.addEventListener("DOMContentLoaded", getGoogleResultsTemplate);

window.onload = () => {
  const searchInput = document.querySelector("#searchLocation");
  searchInput.addEventListener("input", refreshSuggestions);
  const searchBtn = document.querySelector("#search-location-btn");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const location = searchInput.value;
    getLocation(location).then((results) => {
      refreshDashboard(results);
    });
    const locationName = location.split(",")[0];
    getWikiResults(locationName);
    getGoogleResultsLocation(location);
  });

  const chartSearchInput = document.querySelector("#chart-searchLocation");
  chartSearchInput.addEventListener("input", refreshSuggestions);
  const chartSearchBtn = document.querySelector("#chart-search-location-btn");
  chartSearchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const location = chartSearchInput.value;
    getLocation(location).then((results) => {
      refreshDashboard(results);
    });
    const locationName = location.split(",")[0];
    getWikiResults(locationName);
    getGoogleResultsLocation(location);
    focusWindowOnChart();
  });

  defineGradients();
  makeCardsMoveAndBeDraggable();
  checkAndDeleteGeoLocationIcon();

  document
    .getElementById("focus-on-chart-btn")
    .addEventListener("click", focusWindowOnChart);

  // new
  document.getElementById("login-btn").addEventListener("click", requestLogin);
  // document.getElementById("signup-btn").addEventListener("click", createUser);
  document
    .getElementById("signup-btn")
    .addEventListener("click", signUpNewUser);

  document
    .getElementById("logout-link")
    .addEventListener("click", requestLogout);
  document
    .querySelector("#add-favorite-btn")
    .addEventListener("click", addFavoriteButton);
  document
    .querySelector("#uploadPhotoModal")
    .addEventListener("show.bs.modal", uploadPhotoModalShow);
  document
    .querySelector(".button-upload-photo")
    .addEventListener("click", requestUploadPhoto);
  document
    .querySelector(".show-photo-button")
    .addEventListener("click", showOffcanvas);

  //Load default data
  let result = setUserDashboard();
  getWikiResults();
  getFavorites();

  targetLocation = defaultLocation;
  setInterval(refreshDashboard(targetLocation), 5000);

  // refreshDashboard();
};

// new

function showOffcanvas(event) {
  event.preventDefault();

  refreshPhotos(targetLocation);

  let offCanvas = new bootstrap.Offcanvas(
    document.querySelector("#offcanvasExample")
  );
  document.querySelector("#offcanvas-location").innerHTML = targetLocation.name;
  document.querySelector("#offcanvas-lat").innerHTML = targetLocation.lat;
  document.querySelector("#offcanvas-lon").innerHTML = targetLocation.lon;
  offCanvas.show();
}

function uploadPhotoModalShow() {
  document.querySelector("#photoLocation").value = targetLocation.name;
}

function addFavoriteButton() {
  const searchInput = document.querySelector("#searchLocation");
  const location = searchInput.value;

  getLocation(location)
    .then((results) => {
      if (results && results.length > 0) {
        const result = results[0];
        let favorite = {
          name: result.name,
          lat: result.latitude,
          lon: result.longitude,
        };
        addFavorite(favorite);
      } else {
        console.log("No results found");
      }
    })
    .catch((error) => console.log(error));
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    let newLocation = {};
    newLocation.lon = position.coords.longitude;
    newLocation.lat = position.coords.latitude;
    // Reverse geocoding
    reverseGeocoding(newLocation.lat, newLocation.lon)
      .then((response) => response.json())
      .then((data) => {
        newLocation.name = data[0]["name"];
        let locationNameConatiner = (document.getElementById(
          "curent-location-value"
        ).textContent = newLocation.name);
        targetLocation = newLocation;
        refreshDashboardReverseGeocoding(targetLocation);
        createGeoLocationButton();

        getWikiResults(data[0]["name"]);
        getGoogleResultsLocation(data[0]["name"]);
      });
    newLocation.name = "";
    newLocation.isFavorite = false;
    targetLocation = newLocation;
    refreshDashboard(targetLocation);
  });
}

function checkAndDeleteGeoLocationIcon() {
  const buttonContainer = document.getElementById("now-card-icons-container");
  const existingButton = document.getElementById("geo-location-btn");
  if (existingButton) {
    buttonContainer.removeChild(existingButton);
  }
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

function refreshDashboardReverseGeocoding(location) {
  console.log("location", location);
  const latitude = location.lat;
  const longitude = location.lon;
  // updateLocationTitle(location);
  fetchMeteo(latitude, longitude);
}

async function setUserDashboard() {
  checkLogin();
}

function unsetUserDashboard() {}

export { getCurrentLocation };
