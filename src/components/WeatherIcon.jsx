import React from "react";

export const WeatherIcon = ({ description, size = "large" }) => {
  const getIconSVG = () => {
    switch (description?.toLowerCase()) {
      case "clear":
      case "sunny":
        return (
          <svg
            viewBox="0 0 80 80"
            fill="none"
            stroke="#b0b8d0"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="40" cy="40" r="14" />
            <line x1="40" y1="6" x2="40" y2="14" />
            <line x1="40" y1="66" x2="40" y2="74" />
            <line x1="6" y1="40" x2="14" y2="40" />
            <line x1="66" y1="40" x2="74" y2="40" />
            <line x1="17" y1="17" x2="23" y2="23" />
            <line x1="57" y1="57" x2="63" y2="63" />
            <line x1="63" y1="17" x2="57" y2="23" />
            <line x1="23" y1="57" x2="17" y2="63" />
          </svg>
        );
      case "cloudy":
      case "clouds":
        return (
          <svg
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
            viewBox="0 0 80 80"
            fill="none"
            stroke="#b0b8d0"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="40" cy="40" r="14" />
            <line x1="40" y1="6" x2="40" y2="14" />
            <line x1="40" y1="66" x2="40" y2="74" />
            <line x1="6" y1="40" x2="14" y2="40" />
            <line x1="66" y1="40" x2="74" y2="40" />
            <line x1="17" y1="17" x2="23" y2="23" />
            <line x1="57" y1="57" x2="63" y2="63" />
            <line x1="63" y1="17" x2="57" y2="23" />
            <line x1="23" y1="57" x2="17" y2="63" />
          </svg>
        );
    }
  };

  return <div className={`weather-icon ${size}`}>{getIconSVG()}</div>;
};
