import { useState, useEffect } from "react";
import { Sidebar, MainPanel, LoadingSpinner, ErrorAlert } from "./components";
import { getCurrentWeather } from "./services/weather-api";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchValue, setSearchValue] = useState("Baybay");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getCurrentWeather(city);
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather:", err);

      // Differentiate between network errors and invalid city
      let errorMessage = "Failed to fetch weather data";

      if (err.message === "Failed to fetch" || !navigator.onLine) {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else if (err.response?.status === 404 || err.message.includes("404")) {
        errorMessage = `City "${city}" not found. Please check the spelling and try again.`;
      } else if (err.message.includes("401") || err.message.includes("403")) {
        errorMessage = "Invalid API key. Please contact support.";
      }

      setError(errorMessage);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Baybay");
  }, []);

  const handleSearch = (city) => {
    fetchWeather(city || searchValue);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark", !isDark);
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className={`app-container ${isDark ? "dark" : ""}`}>
      <div className="app">
        <Sidebar
          weatherData={weatherData}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearch={handleSearch}
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
          isLoading={loading}
        />
        {loading ? (
          <div className="main-panel">
            <LoadingSpinner />
          </div>
        ) : (
          <MainPanel
            weatherData={weatherData}
            isDark={isDark}
            onThemeToggle={handleThemeToggle}
          />
        )}
      </div>
      {error && <ErrorAlert message={error} onDismiss={handleDismissError} />}
    </div>
  );
}

export default App;
