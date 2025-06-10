import React from 'react';
import Weather from './Weather';
import '../css/myWardrobe.css'
interface WeatherWidgetProps {
  city: String;
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