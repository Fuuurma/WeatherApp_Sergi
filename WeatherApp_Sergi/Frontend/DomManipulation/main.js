import {
  fetchLocation,
  getLocation,
  reverseGeocoding,
  defaultLocation,
} from "./locations.js";
import { defineGradients } from "./drawPlots/drawPlots.js";
import { fetchMeteo } from "./meteoApi.js";
import { manipulateData, updateLocationTitle } from "./manipulateData.js";
import {
  requestLogin,
  requestLogout,
  checkLogin,
  loggedIn,
  createUser,
} from "./login/login.js";

import {
  requestUploadPhoto,
  addFavorite,
  refreshPhotos,
  getFavorites,
} from "./favorites/favorites.js";

import { makeCardsMoveAndBeDraggable } from "../DomManipulation/helpers/makeCardsDraggble.js";

import { getWikiResults } from "../DomManipulation/wikiresults/getWikiResults.js";

let targetLocation = null;

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
  });

  defineGradients();
  makeCardsMoveAndBeDraggable();

  // new
  document.getElementById("login-btn").addEventListener("click", requestLogin);
  document.getElementById("signup-btn").addEventListener("click", createUser);
  document
    .getElementById("logout-link")
    .addEventListener("click", requestLogout);
  document
    .querySelector(".current-location-button")
    .addEventListener("click", getCurrentLocation);
  document
    .querySelector(".add-favorite-button")
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

function refreshSuggestions(e) {
  if (e.target.value !== "" && e.target.value.length > 1) {
    setTimeout(() => {
      fetchLocation(e.target.value);
    }, 250);
  }
}

function refreshDashboard(location) {
  if (location) {
    console.log("location", location);
    const latitude = location[0].latitude;
    const longitude = location[0].longitude;
    updateLocationTitle(location);
    fetchMeteo(latitude, longitude);
  }
}

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
  let favorite = {
    name: targetLocation.name,
    lat: targetLocation.lat,
    lon: targetLocation.lon,
  };
  addFavorite(favorite);
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
        newLocation.name = data[0]["name"] + " (browser geolocation)";
        let locationNameConatiner = (document.getElementById(
          "curent-location-value"
        ).textContent = newLocation.name);
        targetLocation = newLocation;
        refreshDashboardReverseGeocoding(targetLocation);
      });
    newLocation.name = "";
    newLocation.isFavorite = false;
    targetLocation = newLocation;
    refreshDashboard(targetLocation);
  });
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
