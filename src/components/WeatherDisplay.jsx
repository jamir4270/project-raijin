import React from "react";
import { WeatherIcon } from "./WeatherIcon";

export const WeatherDisplay = ({ description, details }) => {
  return (
    <div className="detail-card">
      <div className="detail-label">Weather Description</div>
      <div className="detail-value large">{description}</div>
    </div>
  );
};

export const DetailCard = ({ label, children }) => {
  return (
    <div className="detail-card">
      <div className="detail-label">{label}</div>
      {children}
    </div>
  );
};
