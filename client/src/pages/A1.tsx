// הסבר על קוד ה-React:
 // useState ו-useEffect משמשים לשמירת המידע שמתקבל מה-API ועדכון הממשק.
 // כל פעם שה-city משתנה, מתבצעת קריאה לשרת (API backend) שמחזיר את נתוני מזג האוויר.
 // התקנת Axios ושליחת בקשה ל-API של OpenWeatherMap לקבלת מזג האוויר.
 // שימוש ב-Backend (Node.js עם Express) כדי להוציא את הנתונים ולשלוח אותם ל-Frontend (React).
 // ב-Frontend, השתמש ב-useEffect וב-axios כדי לשלוח את הבקשה ולהציג את הנתונים.

 // Weather.js
 import { useState, useEffect } from 'react';
 import axios from 'axios';
 interface WeatherAProps {
     city: string;
   }
   
     const A1: React.FC<WeatherAProps> = ({ city }) => {
         const [weather, setWeather] = useState<any>(null); // טיפוס כללי עבור נתוני מזג האוויר
         const [loading, setLoading] = useState<boolean>(true);
         const [error, setError] = useState<string | null>(null);
       
 
  //  const apiKey = '47fa8cac82de9fb95d74187722119d68';  // הכנס את המפתח שלך כאן
  //  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;
 
   useEffect(() => {
     const fetchWeather = async () => {
       try {
         const response = await axios.get(city);
         setWeather(response.data);
         setLoading(false);
       } catch (err) {
         setError('לא ניתן לשלוף נתונים.');
         setLoading(false);
       }
     };
 
     fetchWeather();
   }, [city]);
 
   if (loading) {
     return <p>טוען...</p>;
   }
 
   if (error) {
     return <p>{error}</p>;
   }
 
   return (
     <div>
       <h2>מזג האוויר ב-{weather.name}</h2>
       <p>טמפרטורה: {weather.main.temp}°C</p>
       <p>תיאור: {weather.weather[0].description}</p>
       <p>לחות: {weather.main.humidity}%</p>
     </div>
   );
 };
 
 export default A1;