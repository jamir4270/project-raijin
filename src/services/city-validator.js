/**
 * City/Country validation and suggestion service
 */

// List of common countries to prevent country-only searches
const COUNTRIES = new Set([
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts",
  "Saint Lucia",
  "Saint Vincent",
  "Samoa",
  "San Marino",
  "Sao Tome",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor",
  "Togo",
  "Tonga",
  "Trinidad",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
]);

/**
 * Check if input is likely a country name
 * @param {string} input - User input
 * @returns {boolean}
 */
export const isCountryInput = (input) => {
  const normalized = input.trim();
  for (let country of COUNTRIES) {
    if (country.toLowerCase().includes(normalized.toLowerCase())) {
      return true;
    }
  }
  return false;
};

/**
 * Check if input is valid for city search
 * @param {string} input - User input
 * @returns {object} { valid: boolean, message: string }
 */
export const validateCityInput = (input) => {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, message: "Please enter a city name" };
  }

  if (trimmed.length < 2) {
    return { valid: false, message: "City name must be at least 2 characters" };
  }

  if (isCountryInput(trimmed)) {
    return {
      valid: false,
      message: "Please enter a city name, not a country",
    };
  }

  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return {
      valid: false,
      message:
        "City name can only contain letters, spaces, hyphens, and apostrophes",
    };
  }

  return { valid: true, message: "" };
};

/**
 * Get city suggestions from OpenWeatherMap
 * @param {string} input - User input
 * @returns {Promise<array>} Array of suggested cities
 */
export const getCitySuggestions = async (input) => {
  if (!input || input.trim().length < 2) {
    return [];
  }

  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
  const BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";

  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(input)}&limit=5&appid=${API_KEY}`,
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // Filter out country-only results and return city suggestions
    return data
      .filter((location) => location.name && location.country)
      .map((location) => ({
        name: location.name,
        country: location.country,
        countryCode: location.country ? location.country.toUpperCase() : "XX",
        state: location.state || null,
        lat: location.lat,
        lon: location.lon,
      }))
      .slice(0, 5);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
