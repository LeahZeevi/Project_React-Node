
import { useState, useEffect } from 'react';
import axios from 'axios';
interface WeatherAProps {
  city: String;
}

const
  Weather: React.FC<WeatherAProps> = ({ city }) => {
    const [weather, setWeather] = useState<any>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const apiKey = '47fa8cac82de9fb95d74187722119d68';  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;

    useEffect(() => {
      const fetchWeather = async () => {
        try {
          console.log(city);
          const response = await axios.get(url);
          setWeather(response.data);
          setLoading(false);
          console.log(response);

        } catch (err) {
          setError('לא ניתן לשלוף נתונים');
          console.log(city,"city");
          
          setLoading(false);
        }
      };

      fetchWeather();
    }, [city]);



    const getWeatherFeeling = (temp: number) => {
      switch (true) {
        case temp <= 10:
          return 'קר מאוד ❄️';
        case temp > 10 && temp <= 15:
          return 'קריר 🧥';
        case temp > 15 && temp <= 20:
          return 'נעים 🌤️';
        case temp > 20 && temp <= 25:
          return 'נעים־חמים 😎';
        case temp > 25 && temp <= 30:
          return 'חמים ☀️';
        case temp > 30 && temp <= 35:
          return 'חם מאוד 🥵';
        case temp > 35:
          return 'חם קיצוני 🔥';
        default:
          return 'לא ידוע';
      }
    };

    if (error) {
      return <p>{error}</p>;
    }
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px 20px",
            minWidth: "220px",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid #e9ecef",
              borderTop: "3px solid #6c5ce7",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "12px",
            }}
          ></div>
          <h3
            style={{
              margin: "0",
              fontSize: "16px",
              fontWeight: "500",
              color: "#495057",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            בטעינה...
          </h3>
          <style>
            {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
          </style>
        </div>
      )
    }

    return (
      <div
        style={{
          color: "#2c3e50",
          padding: "16px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          direction: "rtl",
          minWidth: "220px",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
      {/* Title */}
        <div
          style={{
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          <h4
            style={{
              margin: "0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#495057",
              letterSpacing: "0.5px",
            }}
          >
            {weather.name}
          </h4>
        </div>

      {/* Central temperature */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "16px",
            padding: "12px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "8px",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "300",
              color: "#2c3e50",
              marginBottom: "4px",
            }}
          >
            {Math.round(weather.main.temp)}°
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#6c757d",
              textTransform: "capitalize",
            }}
          >
            {weather.weather[0].description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontSize: "12px",
            color: "#6c757d",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "500", color: "#495057" }}>{weather.main.humidity}%</div>
            <div>לחות</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "500", color: "#495057" }}>{Math.round(weather.main.feels_like)}°</div>
            <div>מרגיש כמו</div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(108, 117, 125, 0.1)",
            padding: "8px 12px",
            borderRadius: "6px",
            textAlign: "center",
            fontSize: "13px",
            color: "#495057",
            fontWeight: "500",
            border: "1px solid rgba(108, 117, 125, 0.1)",
          }}
        >
          {getWeatherFeeling(weather.main.temp)}
        </div>
      </div>
    )
  }

export default Weather
