// {/* <Fab disabled aria-label="like">
//   <FavoriteIcon />
// </Fab>


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function BasicTextFields() {
//   return (
//     <Box
//       component="form"
//       sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       <TextField id="filled-basic" label="Filled" variant="filled" />
//       <TextField id="standard-basic" label="Standard" variant="standard" />
//     </Box>
//   );
// } */}


// 2. יצירת בקשה ל-API של OpenWeatherMap ב-Node.js
// בשלב הראשון, תוכל לשלוח בקשה ל-API ב-Node.js (בשרת backend שלך) כדי לקבל את נתוני מזג האוויר.

// התקנת חבילת Axios:
// השתמש ב-Axios (או ב-fetch אם אתה מעדיף) כדי לשלוח את הבקשה. אם עדיין לא התקנת את Axios, תוכל להתקין אותו כך:

// bash
// Copy
// npm install axios
// קוד ב-Node.js (Backend):
// javascript
// Copy
// const axios = require('axios');

// // פונקציה לשלוח בקשה ל-API של OpenWeatherMap ולקבל את מזג האוויר
// const getWeather = async (city) => {
//     const apiKey = 'your_api_key';  // הכנס את ה-API Key שלך כאן
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;

//     try {
//         const response = await axios.get(url);
//         const weatherData = response.data;
//         console.log(weatherData);
//         return weatherData;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         return null;
//     }
// };

// // קריאה לפונקציה
// getWeather('Tel Aviv');
// הסבר:

// ה-url כולל את שם העיר (city), ה-appid (המפתח שלך), פרמטר units=metric כדי לקבל את הטמפרטורה ב-Celsius, ו-lang=he להחזיר את התשובות בעברית.
// התשובה מכילה מידע כמו טמפרטורה, תיאור מזג האוויר, רוחות ועוד.
// 3. שליחת הנתונים מ-Backend ל-Frontend (React)
// לאחר קבלת הנתונים ב-Backend, תוכל לשלוח אותם ל-Frontend שלך (React).

// בקוד ב-Node.js (Backend):
// אם אתה משתמש ב-Express, תוכל להוסיף מסלול שיחזיר את נתוני מזג האוויר ל-Frontend.

// javascript
// Copy
// const express = require('express');
// const app = express();

// app.get('/weather/:city', async (req, res) => {
//     const city = req.params.city;
//     const weatherData = await getWeather(city);
//     if (weatherData) {
//         res.json(weatherData);
//     } else {
//         res.status(500).json({ message: 'שגיאה בהבאת מזג האוויר' });
//     }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// 4. שימוש ב-React לקבלת נתוני מזג האוויר
// בצד ה-Frontend (React), תוכל לשלוח בקשה לשרת ה-Node.js שלך ולהציג את נתוני מזג האוויר למשתמש.

// קוד ב-React (Frontend):
// javascript
// Copy
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Weather = () => {
//     const [weather, setWeather] = useState(null);
//     const [city, setCity] = useState('Tel Aviv');

//     useEffect(() => {
//         const fetchWeather = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/weather/${city}`);
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
// הסבר על קוד ה-React:
// useState ו-useEffect משמשים לשמירת המידע שמתקבל מה-API ועדכון הממשק.
// כל פעם שה-city משתנה, מתבצעת קריאה לשרת (API backend) שמחזיר את נתוני מזג האוויר.
// אם הנתונים התקבלו בהצלחה, הם מוצגים למשתמש, אחרת מוצגת הודעת טעינה.
// סיכום:
// התקנת Axios ושליחת בקשה ל-API של OpenWeatherMap לקבלת מזג האוויר.
// שימוש ב-Backend (Node.js עם Express) כדי להוציא את הנתונים ולשלוח אותם ל-Frontend (React).
// ב-Frontend, השתמש ב-useEffect וב-axios כדי לשלוח את הבקשה ולהציג את הנתונים.
// אם יש לך שאלות נוספות או דברים שדורשים הבהרה, אני כאן לעזור!0