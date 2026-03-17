import React from "react";

export const ErrorAlert = ({ message, onDismiss }) => {
  return (
    <div className="error-alert" role="alert">
      <div className="error-content">
        <svg
          className="error-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="error-message">{message}</span>
      </div>
      <button
        className="error-close"
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
};
