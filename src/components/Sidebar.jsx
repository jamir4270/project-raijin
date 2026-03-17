import React, { useState } from "react";
import { SearchInput } from "./SearchInput";
import { TemperatureDisplay } from "./TemperatureDisplay";

export const Sidebar = ({
  weatherData,
  searchValue,
  onSearchChange,
  onSearch,
  isDark,
  onThemeToggle,
}) => {
  return (
    <aside className="sidebar">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        onSearch={onSearch}
      />

      {weatherData && (
        <>
          <TemperatureDisplay
            temperature={weatherData.main.temp}
            feelsLike={weatherData.main.feels_like}
            main={weatherData.weather[0].main}
            description={weatherData.weather[0].description}
            location={weatherData.name}
          />

          <hr className="sidebar-divider" />

          <div className="city-photo">
            <span className="city-photo-label">{weatherData.name}</span>
          </div>
        </>
      )}
    </aside>
  );
};
