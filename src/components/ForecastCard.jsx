import React from "react";

export const ForecastCard = ({
  day,
  high,
  low,
  condition,
  isActive = false,
}) => {
  const getWeatherIcon = () => {
    switch (condition?.toLowerCase()) {
      case "clear":
      case "sunny":
        return (
          <svg
            className="fc-icon"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#7a8db0"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="20" cy="20" r="8" />
            <line x1="20" y1="6" x2="20" y2="10" />
            <line x1="20" y1="30" x2="20" y2="34" />
            <line x1="6" y1="20" x2="10" y2="20" />
            <line x1="30" y1="20" x2="34" y2="20" />
            <line x1="10.5" y1="10.5" x2="13.3" y2="13.3" />
            <line x1="26.7" y1="26.7" x2="29.5" y2="29.5" />
            <line x1="29.5" y1="10.5" x2="26.7" y2="13.3" />
            <line x1="13.3" y1="26.7" x2="10.5" y2="29.5" />
          </svg>
        );
      case "cloudy":
      case "clouds":
        return (
          <svg
            className="fc-icon"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#7a8db0"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M28 22a6 6 0 0 0-6-6 6 6 0 0 0-11.8 1.5A5 5 0 0 0 12 28h16a4 4 0 0 0 0-6z" />
            <line x1="14" y1="33" x2="14" y2="36" />
            <line x1="20" y1="33" x2="20" y2="36" />
            <line x1="26" y1="33" x2="26" y2="36" />
          </svg>
        );
      case "rain":
      case "rainy":
        return (
          <svg
            className="fc-icon"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#7a8db0"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M27 21a5 5 0 0 0-5-5 5.5 5.5 0 0 0-10 1A4 4 0 0 0 13 24h14a3 3 0 0 0 0-3z" />
            <line x1="15" y1="29" x2="13" y2="33" />
            <line x1="21" y1="29" x2="19" y2="33" />
            <line x1="27" y1="29" x2="25" y2="33" />
          </svg>
        );
      default:
        return (
          <svg
            className="fc-icon"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#7a8db0"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="20" cy="20" r="8" />
            <line x1="20" y1="6" x2="20" y2="10" />
            <line x1="20" y1="30" x2="20" y2="34" />
            <line x1="6" y1="20" x2="10" y2="20" />
            <line x1="30" y1="20" x2="34" y2="20" />
          </svg>
        );
    }
  };

  return (
    <div className={`forecast-card ${isActive ? "active" : ""}`}>
      <div className="fc-day">{day}</div>
      {getWeatherIcon()}
      <div className="fc-temps">
        {Math.round(low)}° | {Math.round(high)}°
      </div>
    </div>
  );
};
