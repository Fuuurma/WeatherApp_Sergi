import { getFavorites } from "../favorites/favorites.js";

let loggedIn = false;

async function setUserDashboard() {
  const result = await checkLogin();
  return result;
}

function checkLogin() {
  console.log("Checking session...");
  const formData = new URLSearchParams();
  formData.append("checkLogin", true);

  const options = {
    method: "POST",
    body: formData,
  };

  fetch("./login.php", options)
    .then((response) => response.text())
    .then((data) => {
      if (data != "-1") {
        loggedIn = true;
        document.querySelector(".user-menu button").disabled = false;
        // document.querySelector(".user-menu button").innerHTML = data;
        document.getElementById("login-link").style.display = "none";
        document.getElementById("signup-link").style.display = "none";
        document.getElementById("welcome-user").style.display = "inline";
        document.getElementById("user-name").innerText = data;
        document.getElementById("logout-link").style.display = "inline";
        return true;
      } else {
        loggedIn = false;
        document.querySelector(".user-menu button").disabled = true;
        // document.querySelector(".user-menu button").innerHTML = "";
        document.getElementById("login-link").style.display = "inline";
        document.getElementById("signup-link").style.display = "inline";
        document.getElementById("welcome-user").style.display = "none";
        document.getElementById("logout-link").style.display = "none";
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function requestLogin() {
  console.log("logging in...");
  let user = document.querySelector('#loginForm input[name="user"]').value;
  let password = document.querySelector(
    '#loginForm input[name="password"]'
  ).value;
  const formData = new URLSearchParams();
  formData.append("user", user);
  formData.append("password", password);
  formData.append("login", true);

  const options = {
    method: "POST",
    body: formData,
  };

  fetch("./login.php", options)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      if (data == "1") {
        checkLogin();

        // Hide the login modal after successful login
        const loginModal = bootstrap.Modal.getInstance(
          document.getElementById("loginModal")
        );
        if (loginModal) {
          loginModal.hide();
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function requestLogout() {
  console.log("logging out...");
  const formData = new URLSearchParams();
  formData.append("logout", true);

  const options = {
    method: "POST",
    body: formData,
  };

  fetch("./login.php", options)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      checkLogin();
    })
    .catch((error) => {
      console.log(error);
    });
}

function createUser() {
  console.log("creating user...");
  let user = document.querySelector('#signupForm input[name="user"]').value;
  let password = document.querySelector(
    '#signupForm input[name="password"]'
  ).value;
  const formData = new URLSearchParams();
  formData.append("user", user);
  formData.append("password", password);
  formData.append("signup", true);

  const options = {
    method: "POST",
    body: formData,
  };

  fetch("./signup.php", options)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      if (data == "1") {
        checkLogin();
      }
      new bootstrap.Modal(document.getElementById("signupModal")).hide();
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  requestLogin,
  requestLogout,
  checkLogin,
  loggedIn,
  createUser,
  setUserDashboard,
};
