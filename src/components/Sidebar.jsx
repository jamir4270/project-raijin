import React, { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { TemperatureDisplay } from "./TemperatureDisplay";
import { getCityPhoto } from "../services/unsplash-api";

export const Sidebar = ({
  weatherData,
  searchValue,
  onSearchChange,
  onSearch,
  isDark,
  onThemeToggle,
  isLoading,
}) => {
  const [cityPhoto, setCityPhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);

  useEffect(() => {
    if (!weatherData) return;

    setPhotoLoading(true);
    getCityPhoto(weatherData.name).then((photo) => {
      setCityPhoto(photo);
      setPhotoLoading(false);
    });
  }, [weatherData?.name]);
  return (
    <aside className="sidebar">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        onSearch={onSearch}
        isLoading={isLoading}
      />

      {weatherData && (
        <>
          <TemperatureDisplay
            temperature={weatherData.main.temp}
            feelsLike={weatherData.main.feels_like}
            main={weatherData.weather[0].main}
            description={weatherData.weather[0].description}
            location={weatherData.name}
            countryCode={weatherData.sys?.country}
          />

          <hr className="sidebar-divider" />

          <div className="city-photo">
            {cityPhoto && !photoLoading ? (
              <>
                <img
                  src={cityPhoto.url}
                  alt={weatherData.name}
                  className="city-photo-img"
                />
                <span className="city-photo-label">{weatherData.name}</span>
                <a
                  href={cityPhoto.unsplashLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="city-photo-credit"
                  title={`Photo by ${cityPhoto.photographer}`}
                >
                  Unsplash
                </a>
              </>
            ) : (
              <span className="city-photo-label">{weatherData.name}</span>
            )}
          </div>
        </>
      )}
    </aside>
  );
};
