// import axios from 'axios';
// import  { useState, useEffect } from 'react';


// const Weather = () => {
//     const [weather, setWeather] = useState(null);
//     const [city, setCity] = useState('Tel Aviv');

//     useEffect(() => {
//         const fetchWeather = async () => {
//             try {
//                 const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=your_api_key&units=metric&lang=he`);
//                 setWeather(response.data);
//             } catch (error) {
//                 console.error('Error fetching weather:', error);
//             }
//         };
//         fetchWeather();
//     }, [city]);

    

//     return (
//         <div>
//             <h1>מזג האוויר ב-{city}</h1>
//             {weather ? (
//                 <div>
//                     <p>טמפרטורה: {weather.main.temp}°C</p>
//                     <p>תיאור: {weather.weather[0].description}</p>
//                     <p>רוחות: {weather.wind.speed} km/h</p>
//                 </div>
//             ) : (
//                 <p>טוען נתונים...</p>
//             )}
//         </div>
//     );
// };

// export default Weather;
