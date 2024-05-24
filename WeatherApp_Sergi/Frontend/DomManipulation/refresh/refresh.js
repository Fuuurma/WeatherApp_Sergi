import { updateLocationTitle } from "../manipulateData.js";
import { fetchMeteo } from "../meteoApi.js";
import { fetchLocation } from "../locations.js";

function refreshSuggestions(e) {
  if (e.target.value !== "" && e.target.value.length > 1) {
    setTimeout(() => {
      fetchLocation(e.target.value);
    }, 250);
  }
}

function refreshDashboard(location) {
  if (Array.isArray(location) && location[0] && location[0].latitude) {
    const latitude = location[0].latitude;
    const longitude = location[0].longitude;
    updateLocationTitle(location);
    fetchMeteo(latitude, longitude);
  }
}

export { refreshDashboard, refreshSuggestions };
