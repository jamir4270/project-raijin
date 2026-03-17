import { useState, useEffect } from "react";
import { Sidebar, MainPanel } from "./components";
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
      setError(`Failed to fetch weather for ${city}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Baybay");
  }, []);

  const handleSearch = () => {
    fetchWeather(searchValue);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark", !isDark);
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
        />
        <MainPanel
          weatherData={weatherData}
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App;
