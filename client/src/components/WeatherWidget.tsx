import React from 'react';
import Weather from '../pages/Weather'; // Assuming Weather is a separate component you have

interface WeatherWidgetProps {
  city: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  return (
    <div className="weather-widget">
      <div className="weather-info">
        <div className="temp"></div>
        <Weather city={city}></Weather>
        <div className="condition"></div>
      </div>
    </div>
  );
};

export default WeatherWidget;