// Theme toggle logic
const themeToggle = document.querySelector(".theme-toggle");
const toggleTrack = document.querySelector(".toggle-track");
const toggleKnob = document.querySelector(".toggle-knob");
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  if (toggleKnob) toggleKnob.style.left = dark ? "23px" : "3px";
}
if (themeToggle && toggleTrack && toggleKnob) {
  toggleTrack.style.cursor = "pointer";
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    toggleKnob.style.left = isDark ? "23px" : "3px";
    localStorage.setItem("weather-theme", isDark ? "dark" : "light");
  });
  // On load, set theme from localStorage
  window.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("weather-theme");
    setTheme(theme === "dark");
  });
}
const API_KEY = import.meta.env.OPEN_WEATHER_APP_API_KEY;

// DOM Elements
const searchInput = document.querySelector(".search-bar input");
const cityNameElem = document.querySelector(".city-name");
const countryElem = document.querySelector(".country");
const tempValElem = document.querySelector(".temp-val");
const tempUnitElem = document.querySelector(".temp-unit");
const feelsLikeElem = document.querySelector(".feels-like");
const datetimeElem = document.querySelector(".datetime");
const forecastRow = document.querySelector(".forecast-row");
const cityPhotoLabel = document.querySelector(".city-photo-label");
const forecastTitle = document.querySelector(".forecast-title");
const locationTag = document.querySelector(".location-tag");
const detailGrid = document.querySelector(".detail-grid");

// Enable input
if (searchInput) searchInput.disabled = false;

// Helper: Format date
function formatDate(dt, timezoneOffset) {
  const date = new Date((dt + timezoneOffset) * 1000);
  return date.toUTCString().replace("GMT", "");
}

// Helper: Show loading
function setLoading(isLoading) {
  if (isLoading) {
    cityNameElem.textContent = "Loading...";
    tempValElem.textContent = "--";
    feelsLikeElem.textContent = "--";
    datetimeElem.textContent = "";
    forecastTitle.textContent = "Loading...";
    locationTag.innerHTML = "";
    forecastRow.innerHTML = "<div>Loading forecast...</div>";
    detailGrid.innerHTML = "<div>Loading details...</div>";
  }
}

// Helper: Show error
function setError(msg) {
  cityNameElem.textContent = msg;
  tempValElem.textContent = "--";
  feelsLikeElem.textContent = "--";
  datetimeElem.textContent = "";
  forecastTitle.textContent = "Error";
  locationTag.innerHTML = "";
  forecastRow.innerHTML = "<div>Error loading forecast</div>";
  detailGrid.innerHTML = "<div>Error loading details</div>";
}

// Fetch weather data
async function fetchWeather(city) {
  setLoading(true);
  try {
    // Current weather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    // 5-day / 3-hour forecast
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    if (!forecastRes.ok) throw new Error("Forecast not found");
    const forecastData = await forecastRes.json();

    updateDOM(data, forecastData);
  } catch (err) {
    setError(err.message);
  }
}

// Update DOM with weather data
function updateDOM(current, forecast) {
  // City and country
  cityNameElem.textContent = current.name + " ";
  countryElem.textContent = current.sys.country;
  cityPhotoLabel.textContent = current.name;
  forecastTitle.textContent = `${current.name} Forecast`;
  locationTag.innerHTML = `<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/><circle cx='12' cy='9' r='2.5'/></svg> Weather in ${current.name}`;

  // Temperature
  tempValElem.textContent = Math.round(current.main.temp);
  tempUnitElem.textContent = "°C";
  feelsLikeElem.textContent = `Feels Like: ${Math.round(current.main.feels_like)}°C`;

  // Date/time
  const now = new Date();
  datetimeElem.textContent =
    now.toLocaleTimeString() + " " + now.toLocaleDateString();

  // Forecast (group by day, show min/max for each day)
  forecastRow.innerHTML = "";
  const daily = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString();
    if (!daily[day]) {
      daily[day] = {
        min: item.main.temp_min,
        max: item.main.temp_max,
        dt: item.dt,
      };
    } else {
      daily[day].min = Math.min(daily[day].min, item.main.temp_min);
      daily[day].max = Math.max(daily[day].max, item.main.temp_max);
    }
  });
  let i = 0;
  for (const [day, temps] of Object.entries(daily)) {
    const date = new Date(temps.dt * 1000);
    const dayName = date.toLocaleDateString(undefined, { weekday: "short" });
    forecastRow.innerHTML += `
      <div class="forecast-card${i === 0 ? " active" : ""}">
        <div class="fc-day">${dayName}</div>
        <div class="fc-temps">${Math.round(temps.min)}° | ${Math.round(temps.max)}°</div>
      </div>
    `;
    i++;
    if (i >= 6) break; // Show up to 6 days
  }

  // Details
  detailGrid.innerHTML = `
    <div class="detail-card">
      <div class="detail-label">Humidity</div>
      <div class="detail-value large">${current.main.humidity}%</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Temperature Max | Min</div>
      <div class="temp-maxmin">
        <div class="temp-row-item"><span class="arrow up">↑</span><span class="detail-value">${Math.round(current.main.temp_max)}°C</span></div>
        <div class="temp-row-item"><span class="arrow down">↓</span><span class="detail-value">${Math.round(current.main.temp_min)}°C</span></div>
      </div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Sunrise & Sunset</div>
      <div class="sun-times">
        <div class="sun-time-row"><span class="detail-value">${new Date(current.sys.sunrise * 1000).toLocaleTimeString()}</span><span class="ampm">AM</span></div>
        <div class="sun-time-row"><span class="detail-value">${new Date(current.sys.sunset * 1000).toLocaleTimeString()}</span><span class="ampm">PM</span></div>
      </div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Weather Description</div>
      <div class="detail-value large">${current.weather[0].description}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Pressure</div>
      <div class="detail-value large">${current.main.pressure} <span class="unit">hPa</span></div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Wind Speed</div>
      <div class="detail-value large">${current.wind.speed} <span class="unit">km/h</span></div>
    </div>
  `;
}

// Search event
if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const city = searchInput.value.trim();
      if (city) fetchWeather(city);
    }
  });
}

// Initial load (default city)
window.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Baybay");
});
