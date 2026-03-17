import React from "react";

export const SearchSuggestions = ({
  suggestions,
  onSelectSuggestion,
  isLoading,
}) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="search-suggestions">
      {isLoading && (
        <div className="suggestions-loading">Loading suggestions...</div>
      )}
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="suggestion-item"
          onClick={() => onSelectSuggestion(suggestion)}
          role="option"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSelectSuggestion(suggestion);
          }}
        >
          <div className="suggestion-city">{suggestion.name}</div>
          <div className="suggestion-country">
            {suggestion.state && `${suggestion.state}, `}
            {suggestion.countryCode}
          </div>
        </div>
      ))}
    </div>
  );
};
