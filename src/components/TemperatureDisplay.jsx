import React from "react";
import { WeatherIcon } from "./WeatherIcon";

export const TemperatureDisplay = ({
  temperature,
  feelsLike,
  main,
  description,
  location,
  countryCode,
}) => {
  return (
    <div className="current-info">
      <div className="city-name">
        {location} <span className="country">{countryCode || "XX"}</span>
      </div>

      <WeatherIcon description={main} size="large" />

      <div className="temp-row">
        <span className="temp-val">{Math.round(temperature)}</span>
        <span className="temp-unit">°C | °F</span>
      </div>

      <div className="feels-like">Feels Like: {Math.round(feelsLike)}°C</div>
      <div className="datetime">
        {new Date().toLocaleTimeString()} &nbsp;{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
};
