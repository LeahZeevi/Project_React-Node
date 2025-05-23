import React from 'react';
import Weather from '../pages/Weather'; // Assuming Weather is a separate component you have
import '../css/try.css'
interface WeatherWidgetProps {
  city: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  {console.log("weather before")}

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