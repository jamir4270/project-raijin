import React from "react";
import { ForecastCard } from "./ForecastCard";
import { DetailCard } from "./WeatherDisplay";

export const MainPanel = ({ weatherData, isDark, onThemeToggle }) => {
  if (!weatherData) {
    return (
      <main className="main-panel">
        <header className="panel-header">
          <h2 className="forecast-title">Weather Forecast</h2>
          <div className="theme-toggle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="18"
              height="18"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <div className="toggle-track" onClick={onThemeToggle}>
              <div className={`toggle-knob ${isDark ? "dark" : ""}`}></div>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="18"
              height="18"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </header>
        <p style={{ textAlign: "center", color: "#999", marginTop: "40px" }}>
          Search for a city to see weather data
        </p>
      </main>
    );
  }

  const { main, weather } = weatherData;
  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <main className="main-panel">
      <header className="panel-header">
        <h2 className="forecast-title">{weatherData.name} Forecast</h2>
        <div className="location-tag">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Weather in {weatherData.name}
        </div>
        <div className="theme-toggle">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <div className="toggle-track" onClick={onThemeToggle}>
            <div className={`toggle-knob ${isDark ? "dark" : ""}`}></div>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      </header>

      <div className="forecast-row">
        {daysOfWeek.map((day, index) => (
          <ForecastCard
            key={index}
            day={day}
            high={main.temp_max}
            low={main.temp_min}
            condition={weather[0].main}
            isActive={index === 1}
          />
        ))}
      </div>

      <h3 className="detail-title">Weather Detail</h3>

      <div className="detail-grid">
        <DetailCard label="Humidity">
          <div className="detail-value large">
            {weather[0].humidity || main.humidity}%
          </div>
        </DetailCard>

        <DetailCard label="Temperature Max | Min">
          <div className="temp-maxmin">
            <div className="temp-row-item">
              <span className="arrow up">↑</span>
              <span className="detail-value">
                {Math.round(main.temp_max)}°C
              </span>
            </div>
            <div className="temp-row-item">
              <span className="arrow down">↓</span>
              <span className="detail-value">
                {Math.round(main.temp_min)}°C
              </span>
            </div>
          </div>
        </DetailCard>

        <DetailCard label="Weather Description">
          <div className="detail-value large">{weather[0].main}</div>
        </DetailCard>

        <DetailCard label="Pressure">
          <div className="detail-value large">
            {Math.round(main.pressure)} <span className="unit">hPa</span>
          </div>
        </DetailCard>

        <DetailCard label="Wind Speed">
          <div className="detail-value large">
            {(weatherData.wind?.speed || 0).toFixed(1)}{" "}
            <span className="unit">m/s</span>
          </div>
        </DetailCard>

        <DetailCard label="Visibility">
          <div className="detail-value large">
            {(weatherData.visibility / 1000).toFixed(1)}{" "}
            <span className="unit">km</span>
          </div>
        </DetailCard>
      </div>
    </main>
  );
};
