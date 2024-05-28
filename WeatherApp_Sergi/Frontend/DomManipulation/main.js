import { defineGradients } from "./drawPlots/drawPlots.js";
import { focusWindowOnChart } from "./drawPlots/focusOnChart.js";
import { fetchMeteo } from "./meteoApi.js";
import { manipulateData, updateLocationTitle } from "./manipulateData.js";
import { refreshDashboard, refreshSuggestions } from "./refresh/refresh.js";
import {
  clearInputs,
  checkAndDeleteGeoLocationIcon,
} from "../DomManipulation/helpers/helpers.js";
import { makeCardsMoveAndBeDraggable } from "../DomManipulation/helpers/makeCardsDraggble.js";
import { getWikiResults } from "../DomManipulation/wikiresults/getWikiResults.js";
import { signUpNewUser } from "../DomManipulation/auth/signUp.js";
import {
  fetchLocation,
  getLocation,
  reverseGeocoding,
  defaultLocation,
  getCurrentLocation,
} from "./locations.js";

import {
  requestLogin,
  requestLogout,
  checkLogin,
  loggedIn,
  createUser,
  setUserDashboard,
} from "./auth/login.js";

import {
  requestUploadPhoto,
  addFavorite,
  // refreshPhotos,
  addFavoriteAction,
  getFavorites,
} from "./favorites/favorites.js";

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
  // Búsqueda
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const location = searchInput.value;
    getLocation(location).then((results) => {
      refreshDashboard(results);
    });
    const locationName = location.split(",")[0];
    getWikiResults(locationName);
    getGoogleResultsLocation(location);
    checkAndDeleteGeoLocationIcon();
    clearInputs();
  });

  // Búsqueda por Input del gráfico
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
    checkAndDeleteGeoLocationIcon();
    clearInputs();
  });

  defineGradients(); // para el gráfico
  makeCardsMoveAndBeDraggable(); // cards 24 horas

  document
    .getElementById("focus-on-chart-btn")
    .addEventListener("click", focusWindowOnChart);

  document.getElementById("login-btn").addEventListener("click", requestLogin);

  document
    .getElementById("signup-btn")
    .addEventListener("click", signUpNewUser);

  document
    .getElementById("logout-link")
    .addEventListener("click", requestLogout);
  document
    .querySelector("#add-favorite-btn")
    .addEventListener("click", addFavoriteAction);
  document
    .querySelector("#uploadPhotoModal")
    .addEventListener("show.bs.modal", uploadPhotoModalShow);
  document
    .querySelector(".button-upload-photo")
    .addEventListener("click", requestUploadPhoto);
  document
    .querySelector(".show-photo-button")
    .addEventListener("click", showOffcanvas);

  getWikiResults();
  getFavorites();
  let result = setUserDashboard();

  targetLocation = defaultLocation;
  setInterval(refreshDashboard(targetLocation), 5000);
};

function showOffcanvas(event) {
  event.preventDefault();
  // refreshPhotos(targetLocation);
  let offCanvas = new bootstrap.Offcanvas(
    document.querySelector("#offcanvasExample")
  );
  // document.querySelector("#offcanvas-location").innerHTML = targetLocation.name;
  // document.querySelector("#offcanvas-lat").innerHTML = targetLocation.lat;
  // document.querySelector("#offcanvas-lon").innerHTML = targetLocation.lon;
  offCanvas.show();
}

function uploadPhotoModalShow() {
  document.querySelector("#photoLocation").value = targetLocation.name;
}

// function unsetUserDashboard() {}
