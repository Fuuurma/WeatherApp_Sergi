import { fetchMeteo } from "../meteoApi.js";
import { updateDashboard } from "../dashboard/dashboards.js";
import { getCurrentLocation, getLocation } from "../locations.js";
import { updateLocationTitle } from "../manipulateData.js";

function getFavorites() {
  console.log("Getting favorites...");

  const formData = new URLSearchParams();
  formData.append("getFavorite", true);

  const options = {
    method: "POST",
    body: formData,
  };

  fetch("./favorites.php", options)
    .then((response) => {
      return response.json();
    })
    .then((favorites) => {
      // console.log(favorites)
      refreshFavorites(favorites);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addFavoriteAction() {
  const location = document.getElementById("curent-location-value").innerText;
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
      } else console.log("No results found");
    })
    .catch((error) => console.log(error));
}

function addFavorite(favorite) {
  console.log("Adding new favorite...");

  const formData = new URLSearchParams();
  formData.append("addFavorite", true);
  formData.append("name", favorite.name);
  formData.append("lat", favorite.lat);
  formData.append("lon", favorite.lon);

  const options = {
    method: "POST",
    body: formData,
  };
  fetch("./favorites.php", options)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // console.log(response)
      getFavorites();
    })
    .catch((error) => {
      console.log(error);
    });
}

function refreshFavorites(favorites) {
  // Borrar favoritos actuales
  let favoritesList = document.querySelectorAll(".favorites-list")[0];
  Array.from(favoritesList.children).forEach((element) => {
    element.remove();
  });

  createCurrentLocationOption();
  if (favorites) {
    favorites.forEach((favorite) => {
      createNewFavoriteItem(favorite);
    });
  }
}

function createCurrentLocationOption() {
  let currentLocationBtn = document.createElement("a");
  currentLocationBtn.className = "current-location-button dropdown-item";
  currentLocationBtn.style.cursor = "pointer";
  currentLocationBtn.addEventListener("click", getCurrentLocation);

  let icon = document.createElement("i");
  icon.className = "geoloc-icon bi bi-crosshair me-2";

  let text = document.createTextNode("Current location");
  currentLocationBtn.append(icon);
  currentLocationBtn.append(text);

  let favoritesList = document.querySelectorAll(".favorites-list")[0];

  let newItem = document.createElement("li");
  newItem.append(currentLocationBtn);
  favoritesList.append(newItem);
}

function createNewFavoriteItem(favorite) {
  let newAnchor = document.createElement("a");
  newAnchor.innerHTML = favorite.name;
  newAnchor.classList.add("favorite");
  newAnchor.classList.add("dropdown-item");
  newAnchor.setAttribute("lon", favorite.lon);
  newAnchor.setAttribute("lat", favorite.lat);
  newAnchor.style.cursor = "pointer";
  newAnchor.addEventListener("click", (e) => fetchFavorite(e));

  let newItem = document.createElement("li");
  newItem.append(newAnchor);

  let favoritesList = document.querySelectorAll(".favorites-list")[0];
  favoritesList.append(newItem);
}

function fetchFavorite(event) {
  let location = {
    name: event.target.innerText,
    lat: event.target.getAttribute("lat"),
    lon: event.target.getAttribute("lon"),
  };
  updateLocationTitle(location);
  fetchMeteo(location.lat, location.lon);
  // .then((response) => response.json())
  // .then((data) => {
  //   // console.log(data)
  //   updateDashboard(data, location);
  // })
  // .catch((error) => console.log(error));
}

function requestUploadPhoto() {
  console.log("Uploading photo...");
  // event.preventDefault()
  let location = document.querySelector(
    'form input[name="photoLocation"]'
  ).value;
  let photo = document.querySelector('form input[name="photoFile"]').files[0];
  const formData = new FormData();
  formData.append("name", location);
  formData.append("photo", photo);
  formData.append("uploadPhoto", true);

  const options = {
    method: "POST",
    body: formData,
    // headers: {
    //     'Content-Type': 'multipart/form-data',
    // }
  };

  fetch("./favorites.php", options)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log("Photo uploaded successfully");
      // $('#uploadPhotoModal').modal('hide')                                         // via jquery
      let modal = new bootstrap.Modal(
        document.querySelector("#uploadPhotoModal")
      ); // via instance
      modal.hide();
    })
    .catch((error) => {
      console.log(error);
    });
}

// function refreshPhotos(location) {
//   document.querySelectorAll(".carousel-item").forEach((element) => {
//     element.remove();
//   });

//   console.log(`Downloading photos from ...${location.name}`);

//   const formData = new FormData();
//   formData.append("downloadPhotos", true);
//   formData.append("location", location.name);

//   const options = {
//     method: "POST",
//     body: formData,
//   };

//   fetch("./favorites.php", options)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);

//       data.forEach((url) => {
//         let photo = document.createElement("img");
//         photo.src = url["url"];
//         photo.classList.add(
//           "d-block",
//           "w-100",
//           "border",
//           "border-3",
//           "border-danger-subtle",
//           "rounded-4"
//         );
//         let carouselItem = document.createElement("div");
//         carouselItem.classList.add("carousel-item");
//         carouselItem.append(photo);
//         document
//           .querySelector("#carouselExample div.carousel-inner")
//           .append(carouselItem);
//       });
//       document.querySelector(".carousel-item").classList.add("active");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export { getFavorites, addFavorite, requestUploadPhoto, addFavoriteAction };
