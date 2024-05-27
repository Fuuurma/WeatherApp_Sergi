<!DOCTYPE html>
<html lang="es-ES" class="h-100" data-bs-theme="light">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="" />
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors" />
  <meta name="generator" content="Hugo 0.122.0" />
  <title>Meteodaw</title>

  <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/cover/">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" \ integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" \ crossorigin="anonymous">
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.3/themes/base/jquery-ui.css">
  <!-- Favicons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <meta name="theme-color" content="#712cf9" />

  <!-- Custom styles for this template -->
  <link href="../assets/css/cover.css" rel="stylesheet" />
  <link href="../assets/css/style.css" rel="stylesheet" />
</head>

<body class="bg-black bg-gradient">
  <div class="main-container container-fluid p-0 m-0 d-flex flex-column justify-content-between ">
    <header id="navbar" class="mb-2 d-flex flex-row align-items-center justify-content-between w-100 px-5 bg-primary">
      <div class="page-logo d-flex flex-row align-items-center justify-content-between">
        <i class="page-icon bi bi-rainbow"></i>
        <h3 class="float-md-start mb-0 text-light">_METEODAW</h3>
      </div>

      <div class="d-flex">
        <input id="searchLocation" class="search-input form-control me-2 bg-light bg-gradient" type="search" placeholder="Search" aria-label="Search" list="suggestions" autocomplete="off" tabindex="1">
        <datalist id="suggestions">
        </datalist>
        <button id="search-location-btn" class="search-button btn btn-light" type="submit">Search</button>

      </div>



      <div class="auth-links">
        <span id="login-link" class="auth-link text-light px-5 link-offset-2" style="cursor:pointer; text-decoration: underline;" data-bs-toggle="modal" data-bs-target="#loginModal">Login</span>
        <span id="signup-link" class="auth-link text-light link-offset-2" style="cursor:pointer; text-decoration: underline;" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</span>
        <span id="welcome-user" class="auth-link text-light px-5 link-offset-2" style="display:none;">Welcome, <span id="user-name"></span></span>
        <span id="logout-link" class="auth-link text-light link-offset-2" style="cursor:pointer; text-decoration: underline; display:none;">Logout</span>
      </div>
  </div>
  </header>



  <!-- Add modals for login and signup -->
  <div class="modal fade bg-black bg-gradient" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog text-light">
      <div class="modal-content bg-dark shadow shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Login</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="loginForm">
            <div class="mb-3">
              <label for="loginUser" class="form-label">Username</label>
              <input type="text" class="form-control" id="loginUser" name="user" required>
            </div>
            <div class="mb-3">
              <label for="loginPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="loginPassword" name="password" required>
            </div>
            <button type="button" id="login-btn" class="btn btn-primary mt-1">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade bg-black bg-gradient" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-light shadow shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="signupModalLabel">Sign Up</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="signupForm">
            <div class="mb-3">
              <label for="signupUser" class="form-label">Username</label>
              <input type="text" class="form-control" id="signupUser" name="signupUser" required>
            </div>
            <div class="mb-3">
              <label for="signupPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="signupPassword" name="signupPassword" required>
            </div>
            <button type="button" id="signup-btn" class="btn btn-primary mt-1">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>




  <!-- WEATHER INFO CARDS -->
  <main class="">
    <div class="row mt-3 ms-3">
      <!-- LEFT SIDE CARDS -->
      <!-- BRIEFING CARDS -->
      <div class="col-4 col-md-3 d-flex flex-column row-gap-1 justify-content-start align-items-start">

        <!-- Card Ara-->
        <div class="card-ara card bg-dark bg-gradient w-100 text-light mb-3">
          <div class="card-body d-flex flex-column">
            <div id="now-card-icons-container" class="container w-25 position-absolute top-0 end-0 position-relative mt-3 me-2 d-flex flex-column gap-2">
              <button type="button" id="add-favorite-btn" class="add-favorite-button btn btn-sm btn-secondary rounded-pill shadow shadow-lg">
                <i class="bi bi-heart"></i>
              </button>
              <button type="button" id="focus-on-chart-btn" class="btn btn-sm btn-secondary rounded-pill shadow shadow-lg">
                <i class="bi bi-graph-up-arrow"></i>
              </button>
            </div>

            <span class="h2 card-text-ara card-text w-75 m-2" id="curent-location-value"></span>
            <div class="d-flex flex-row justify-content-evenly align-items-center mb-5">
              <div class="col-6">
                <div class="row m-2">
                  <span class="h4 card-text-resum card-text ps-0" id="current-weather-code-description"></span>
                </div>
                <div class="row m-2">
                  <span id="current-temperature-value" class="h3 card-text-temp card-text ps-0"></span>
                </div>
                <div class="row m-2 d-inline">
                  <i class="card-icon bi bi-calendar ps-0"></i>
                  <span class="card-text-data card-text ps-0" id="current-time-value"></span>
                </div>
              </div>
              <div class="col-6 d-flex justify-content-center">
                <img src="" class="card-img card-img-top" id="current-weather-code-img" alt="..." />
              </div>
            </div>
            <div class="row d-flex flex-row justify-content-center align-items-center">
              <div class="col-6">
                <button id="see-facts-btn" class="btn btn-secondary w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#off-canvas-facts" aria-controls="off-canvas-facts">
                  ¿Did you know?
                  <!-- <i class="bi bi-question"></i> -->
                </button>
              </div>
              <div class="col-6">
                <button id="see-images-btn" class="show-photo-button btn btn-secondary w-100" type="button">
                  Images
                  <i class="bi bi-image"></i>
                </button>
              </div>
            </div>
            <div class="dropdown user-menu w-100">
              <button class="btn btn-secondary my-3 mb-0 dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled>
                See Favorites
              </button>
              <ul class="favorites-list dropdown-menu">
              </ul>
            </div>
          </div>
        </div>


      </div>



      <!-- RIGHT SIDE CARDS -->
      <div class="col-8 col-md-9 d-flex flex-column justify-content-start align-items-center gap-4">
        <div class="card-briefing container-fluid d-flex flex-row gap-2 flex-wrap justify-content-between w-100">
          <!-- Card Previsió 7 dies-->

          <div class="card-previsio-5dies card bg-dark bg-gradient text-light" id="weekly-weather-card">
            <div class="card-body d-flex flex-column gap-1 pt-0">

              <!-- Header -->
              <div class="d-flex flex-row justify-content-evenly align-items-center rounded-3 pt-1 pb-2 roounded bg-dark bg-gradient mt-2">
                <div class="col-2 d-flex justify-content-center">#</div>
                <div class="col-2 d-flex justify-content-center">Date</div>
                <div class="col-2 d-flex justify-content-center"> Min - Max</div>
                <div class="col-2 d-flex justify-content-center">Precipitations</div>
                <div class="col-2 d-flex justify-content-center">Wind</div>
                <div class="col-2 d-flex justify-content-center">See more</div>
              </div>

              <div class="d-flex flex-row justify-content-evenly align-items-center daily-weather-row rounded-3 py-1">
                <div class="col-2 d-flex justify-content-center">
                  <img src="" class="card-img card-img-top" alt="..." />
                </div>
                <div class="col-2">
                  <span class="card-text-data card-text text-start h6"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-text-temp card-text text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-rain card-text text-light text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center gap-2">
                  <span class="card-wind card-text text-light text-start"></span>
                  <img src="../assets/images/weather_icons/direction.png" class="weekly-weather-wind-img card-img-top img-fluid w-25" alt="">
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <button class="btn btn-sm see-hourly-data  btn-secondary rounded-pill shadow shadow-lg w-50" data-day-order="0">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-evenly align-items-center daily-weather-row rounded-3 py-1">
                <div class="col-2 d-flex justify-content-center">
                  <img src="" class="card-img card-img-top" alt="..." />
                </div>
                <div class="col-2">
                  <span class="card-text-data card-text text-start h6"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-text-temp card-text text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-rain card-text text-light text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center gap-2">
                  <span class="card-wind card-text text-light text-start"></span>
                  <img src="../assets/images/weather_icons/direction.png" class="weekly-weather-wind-img card-img-top img-fluid w-25" alt="">

                </div>
                <div class="col-2 d-flex justify-content-center">
                  <button class="btn btn-sm see-hourly-data  btn-secondary rounded-pill shadow shadow-lg w-50" data-day-order="0">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-evenly align-items-center daily-weather-row rounded-3 py-1">
                <div class="col-2 d-flex justify-content-center">
                  <img src="" class="card-img card-img-top" alt="..." />
                </div>
                <div class="col-2">
                  <span class="card-text-data card-text text-start h6"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-text-temp card-text text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-rain card-text text-light text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center gap-2">
                  <span class="card-wind card-text text-light text-start"></span>
                  <img src="../assets/images/weather_icons/direction.png" class="weekly-weather-wind-img card-img-top img-fluid w-25" alt="">
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <button class="btn btn-sm see-hourly-data  btn-secondary rounded-pill shadow shadow-lg w-50" data-day-order="0">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>


              <div class="d-flex flex-row justify-content-evenly align-items-center daily-weather-row rounded-3 py-1">
                <div class="col-2 d-flex justify-content-center">
                  <img src="" class="card-img card-img-top" alt="..." />
                </div>
                <div class="col-2">
                  <span class="card-text-data card-text text-start h6"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-text-temp card-text text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-rain card-text text-light text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center gap-2">
                  <span class="card-wind card-text text-light text-start"></span>
                  <img src="../assets/images/weather_icons/direction.png" class="weekly-weather-wind-img card-img-top img-fluid w-25" alt="">
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <button class="btn btn-sm see-hourly-data  btn-secondary rounded-pill shadow shadow-lg w-50" data-day-order="0">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>


              <div class="d-flex flex-row justify-content-evenly align-items-center daily-weather-row rounded-3 py-1">
                <div class="col-2 d-flex justify-content-center">
                  <img src="" class="card-img card-img-top" alt="..." />
                </div>

                <div class="col-2">
                  <span class="card-text-data card-text text-start h6"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-text-temp card-text text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-rain card-text text-light text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center gap-2">
                  <span class="card-wind card-text text-light text-start"></span>
                  <img src="../assets/images/weather_icons/direction.png" class="weekly-weather-wind-img card-img-top img-fluid w-25" alt="">
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <button class="btn btn-sm see-hourly-data  btn-secondary rounded-pill shadow shadow-lg w-50" data-day-order="0">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-evenly align-items-center daily-weather-row rounded-3 py-1">
                <div class="col-2 d-flex justify-content-center">
                  <img src="" class="card-img card-img-top" alt="..." />
                </div>
                <div class="col-2">
                  <span class="card-text-data card-text text-start h6"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-text-temp card-text text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-rain card-text text-light text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center gap-2">
                  <span class="card-wind card-text text-light text-start"></span>
                  <img src="../assets/images/weather_icons/direction.png" class="weekly-weather-wind-img card-img-top img-fluid w-25" alt="">
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <button class="btn btn-sm see-hourly-data  btn-secondary rounded-pill shadow shadow-lg w-50" data-day-order="0">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-evenly align-items-center daily-weather-row rounded-3 py-1">
                <div class="col-2 d-flex justify-content-center">
                  <img src="" class="card-img card-img-top" alt="..." />
                </div>
                <div class="col-2">
                  <span class="card-text-data card-text text-start h6"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-text-temp card-text text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <span class="card-rain card-text text-light text-start"></span>
                </div>
                <div class="col-2 d-flex justify-content-center align-items-center gap-2">
                  <span class="card-wind card-text text-light text-start"></span>
                  <img src="../assets/images/weather_icons/direction.png" class="weekly-weather-wind-img card-img-top img-fluid w-25" alt="">
                </div>
                <div class="col-2 d-flex justify-content-center">
                  <button class="btn btn-sm see-hourly-data  btn-secondary rounded-pill shadow shadow-lg w-50" data-day-order="0">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>



      <div class="row d-flex flex-row my-3">

        <div class="col-12 d-flex flex-row gap-3">
          <!-- AIR QUALITY -->
          <div class="card-qualitat-aire card bg-dark bg-gradient w-100 text-light p-0">
            <div class="card-body d-flex flex-column p-2 justify-content-center">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span class="card-text-titol card-text ps-2">Air Quality</span>
                <span class="" id="air-quality-index-badge"></span>
              </div>
              <div class="d-flex flex-row justify-content-around align-items-center">
                <i class="card-icon bi bi-clipboard-data"></i>
                <div class="d-flex flex-column gap-1 justify-content-between align-items-center">
                  <span class="card-text-variable card-text">PM25</span>
                  <span class="card-text-mesura card-text" id="pm-25-value"></span>
                </div>
                <div class="d-flex flex-column gap-1 justify-content-between align-items-center">
                  <span class="card-text-variable card-text">SO2</span>
                  <span class="card-text-mesura card-text" id="so2-value"></span>
                </div>
                <div class="d-flex flex-column gap-1 justify-content-between align-items-center">
                  <span class="card-text-variable card-text">NO2</span>
                  <span class="card-text-mesura card-text" id="no2-value"></span>
                </div>
                <div class="d-flex flex-column gap-1 justify-content-between align-items-center">
                  <span class="card-text-variable card-text">O3</span>
                  <span class="card-text-mesura card-text" id="o3-value"></span>
                </div>
              </div>
            </div>
          </div>

          <!-- SUNRISE - SUNSET -->
          <div class="card-sol card bg-dark bg-gradient w-100 text-light">
            <div class="card-body d-flex flex-column p-2 justify-content-center">
              <div class="row">
                <div class="col-12 d-flex flex-row gap-3 justify-content-around">
                  <i class="card-icon bi bi-brightness-high"></i>
                  <div class="h6">Sunrise</div>
                  <i class="card-icon bi bi-moon"></i>
                  <div class="h6">Sunset</div>
                </div>
                <div class="col-12 d-flex flex-row gap-5 justify-content-center align-items-center">
                  <div class="h4" id="sunrise-value"></div>
                  <div class="h4" id="sunset-value"></div>
                </div>
              </div>
            </div>
          </div>


          <!-- Card: Humitat -->
          <div class="card-humitat card bg-dark bg-gradient w-100 text-light d-flex">
            <div class="card-body d-flex flex-column p-2 justify-content-center">
              <div class="row">
                <div class="col-12 d-flex flex-row gap-3 justify-content-center align-items-center">
                  <div class="h6 card-text-titol card-text">Humidity</div>
                  <i class="card-icon bi bi-moisture bi-2x"></i>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                  <div id="current-humidity-value" class="h3 card-text-mesura card-text"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card: Pressió -->
          <div class="card-pressio card bg-dark bg-gradient w-100 text-light">
            <div class="card-body d-flex flex-column p-2 justify-content-center">
              <div class="row">
                <div class="col-12 d-flex flex-row gap-3 justify-content-center align-items-center">
                  <div class="h6 card-text-titol card-text">Atmospheric Pressure</div>
                  <i class="card-icon bi bi-hurricane bi-2x"></i>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                  <div class="h3 card-text-mesura card-text" id="current-pressure-value"></div>
                </div>
              </div>
            </div>
          </div>



          <!-- Card: Visibilitat -->
          <div class="card-visibilitat card bg-dark bg-gradient w-100 text-light">
            <div class="card-body d-flex flex-column p-2 justify-content-center align-items-center">
              <div class="row">
                <div class="col-12 d-flex flex-row gap-3 justify-content-center align-items-center">
                  <div class="h6 card-text-titol card-text">Rain</div>
                  <i class="card-icon bi bi-cloud-drizzle bi-2x d-flex justify-content-center"></i>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                  <div class="h3 card-text-mesura card-text" id="max-probability-precipitation-value"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card: Sensació -->
          <div class="card-sensacio card bg-dark bg-gradient w-100 text-light">
            <div class="card-body d-flex flex-column p-2 justify-content-center align-items-center">
              <div class="row">
                <div class="col-12 d-flex flex-row gap-3 justify-content-center align-items-center">
                  <div class="h6 card-text-titol card-text">Wind</div>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                  <img src="../assets/images/weather_icons/direction.png" id="current-wind-direction-img" alt="">
                  <div id="current-wind-value" class="h3 card-text-mesura card-text"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="container-fluid overflow-hidden">
          <div class="card-previsio-horaria row flex-nowrap overflow-auto gap-1">
            <!-- <div
              class="card-previsio-horaria container-fluid d-flex flex-row gap-1 overflow-x-auto"
            > -->
            <!-- Controls cards/gràfica -->

            <!-- Previsió per hores -->
            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light" id="card-1">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light" id="card-1">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light" id="card-1">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />

                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />

                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>

            <div class="card-previsio-per-hores card bg-dark bg-gradient text-light me-5">
              <div class="card-body d-flex flex-column gap-3 align-items-center justify-content-evenly px-0 py-1">
                <span class="h4 card-text-hora card-text mt-2"></span>
                <img src="" class="card-img card-img-top hourly-weather-icon" alt="..." />
                <span class="h5 card-text-temp card-text"></span>
                <img src="../assets/images/weather_icons/direction.png" class="card-img img-vent card-img-top" alt="..." />
                <span class="h5 card-text-temp wind-speed"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-4 w-75 mx-auto bg-dark rounded-3 text-light">
        <div class="container w-100 mx-auto mt-4 mb-2" id="chart-container">
          <div class="row d-flex flex-nowrap align-items-center gap-2">
            <div class="col-7 d-flex gap-2">
              <input id="chart-searchLocation" class="search-input form-control bg-light bg-gradient w-75" type="search" placeholder="Search" aria-label="Search" list="suggestions" autocomplete="off" tabindex="1" style="flex: 1;">
              <button id="chart-search-location-btn" class="search-button btn btn-light" type="submit">Search</button>
            </div>

            <div class="col-5 d-flex gap-3 ">
              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="temperature" autocomplete="off" checked />
                <label class="btn btn-outline-primary" for="temperature">Temperature</label>

                <input type="radio" class="btn-check" name="btnradio" id="rain" autocomplete="off" />
                <label class="btn btn-outline-primary" for="rain">Precipitation</label>

                <input type="radio" class="btn-check" name="btnradio" id="wind" autocomplete="off" />
                <label class="btn btn-outline-primary" for="wind">Wind</label>
              </div>

              <div class="btn-group dropup">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Day
                </button>
                <ul class="dropdown-menu">
                  <!-- Dropdown menu links -->
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Action two</a></li>
                  <li><a class="dropdown-item" href="#">Action three</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="h3 m-0 p-0 d-flex justify-content-center text-light my-2 gap-4">
            <span id="hourly-data-location-title" class=""></span>
            <span id="hourly-data-day-title"></span>
          </div>
          <div id="temperature-chart" class="text-center m-0"></div>
          <div id="rain-chart" class="d-none text-center m-0"></div>
          <div id="wind-chart" class="d-none text-center m-0"></div>
          <div id="tooltip"></div>
        </div>
      </div>

      <footer class="w-100 mt-3 text-white-50 d-flex flex-columns justify-content-around">
        <span>ETP XAVIER CFGS DAW M6-M7 2023/2024</span>
        <span>Dades ofertes per
          <a target="_blank" href="https://open-meteo.com/">Open-Meteo.com</a></span>
      </footer>
  </main>

  <!-- UPLOAD PHOTO MODAL -->
  <div class="modal fade bg-dark bg-gradient" id="uploadPhotoModal" tabindex="-1" aria-labelledby="uploadPhotoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="uploadPhotoLabel">Upload photo</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="photoLocation" class="form-label">Location</label>
              <input type="text" class="form-control" id="photoLocation" name="photoLocation" readonly>
            </div>
            <!-- Image input -->
            <div class="mb-3">
              <label for="photoFile" class="form-label">Select photo to upload</label>
              <input class="form-control" type="file" id="photoFile" name="photoFile">
            </div>
            <button type="button" class="button-upload-photo btn btn-primary" name="login">Upload</button>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

  <!-- OFFCANVAS INTERESTING FACTS LOCATION-->
  <div class="offcanvas offcanvas-start w-25 d-flex flex-column bg-black bg-gradient" tabindex="-2" id="off-canvas-facts" aria-labelledby="off-canvas-facts" data-bs-theme="dark">
    <div class="offcanvas-header mb-0 flex-shrink-0">
      <h5 class="offcanvas-title bg-dark mx-5 mb-2 p-3 rounded" id="off-canvas-title"></h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" tabindex="1"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column flex-grow-1 p-0">
      <div id="facts-container" class="flex-grow-1 overflow-auto p-3">
        <!-- Facts will be injected here -->
      </div>
      <div class="flex-grow-1 d-flex flex-column">
        <div class="col bg-dark mx-5 my-2 p-3 align-items-center rounded">
          <div class="h3">See also</div>
          <div id="search-results" class="overflow-auto">
            <div class="loader spinner-grow text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="loader spinner-grow text-secondary" role="status" style="animation-delay: 0.15s;">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="loader spinner-grow text-light" role="status" style="animation-delay: 0.33s;">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  <!-- OFFCANVAS  PHOTO DISPLAY-->
  <div class="offcanvas offcanvas-bottom bg-dark text-light h-100" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" data-bs-backdrop="false">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title mx-5" id="offcanvasExampleLabel">Images from Location - Work in progress</h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="container">
        <div class="row mb-4">
          <div class="col d-flex justify-content-between align-items-center">
            <div>
              <button class="btn btn-light me-2" type="button" data-bs-toggle="modal" data-bs-target="#uploadPhotoModal">
                <i class="bi bi-camera"></i> Upload Photo
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="card bg-secondary text-light mb-4">
              <div class="card-body">
                <h6 class="card-title">Location:</h6>
                <p id="offcanvas-location" class="card-text">wwww</p>
                <h6 class="card-title">Latitude:</h6>
                <p id="offcanvas-lat" class="card-text">-</p>
                <h6 class="card-title">Longitude:</h6>
                <p id="offcanvas-lon" class="card-text">-</p>
              </div>
            </div>
          </div>
          <div class="col-md-8 ">
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">

                </div>
                <!-- Add more carousel items here -->
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Upload Photo Modal (if needed) -->
  <div class="modal fade" id="uploadPhotoModal" tabindex="-1" aria-labelledby="uploadPhotoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="uploadPhotoModalLabel">Upload Photo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <!-- Form content here -->
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  </div>

  </div>


</body>
<!-- Plots !! -->
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" \ integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" \ crossorigin="anonymous"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js"></script> -->

<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="https://code.jquery.com/ui/1.13.3/jquery-ui.js"></script>
<!-- <script src="./assets/js/color-modes.js"></script> -->
<script src="../DomManipulation/main.js" type="module"></script>

<script>
  const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasExample'));

  function displayLocationImages(locationName, latitude, longitude, images) {
    document.getElementById('offcanvas-location').textContent = locationName;
    document.getElementById('offcanvas-lat').textContent = latitude;
    document.getElementById('offcanvas-lon').textContent = longitude;

    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Clear existing carousel items

    images.forEach((image, index) => {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }
      carouselItem.innerHTML = `
        <img src="${image}" class="d-block w-100" alt="...">
      `;
      carouselInner.appendChild(carouselItem);
    });
  }

  // Call the displayLocationImages function with the location details and image URLs
  displayLocationImages('Barcelona', 37.7749, -122.4194, [
    '../assets/images/work-in-progress.png',
    'https://picsum.photos/id/1016/536/354',
    'https://picsum.photos/id/1017/536/354',
  ]);
</script>

</html>