import React, { useState, useEffect } from "react";
import {
  getCitySuggestions,
  validateCityInput,
} from "../services/city-validator";
import { SearchSuggestions } from "./SearchSuggestions";

export const SearchInput = ({ value, onChange, onSearch, isLoading }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Debounce suggestions fetch
  useEffect(() => {
    if (!value.trim() || value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSuggestionsLoading(true);
      try {
        const suggestions = await getCitySuggestions(value);
        setSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    const validation = validateCityInput(value);
    if (!validation.valid) {
      setValidationError(validation.message);
      return;
    }
    setValidationError("");
    setShowSuggestions(false);
    onSearch();
  };

  const handleSelectSuggestion = (suggestion) => {
    const cityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}`
      : suggestion.name;
    onChange(cityName);
    setShowSuggestions(false);
    setValidationError("");
    onSearch(cityName);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setValidationError("");
          }}
          onKeyDown={handleKeyPress}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          disabled={isLoading}
          className={validationError ? "error" : ""}
        />
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          onClick={handleSearch}
          style={{
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
      </div>
      {validationError && <div className="search-error">{validationError}</div>}
      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
          isLoading={suggestionsLoading}
        />
      )}
    </div>
  );
};
