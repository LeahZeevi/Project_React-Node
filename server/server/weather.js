// //  console.log("weather");
 
// // const express = require('express');
// // const axios = require('axios');
// // const router = express.Router();
// //  const app=express();
// //  app.use(express.json());
// //  app.use(bodyParser.json());
// //  export const dataweather=async()=>{
// //  // פונקציה לשלוח בקשה ל-API של OpenWeatherMap ולקבל את מזג האוויר
// //  const getWeather = async (city) => {
// //      const apiKey = '47fa8cac82de9fb95d74187722119d68';  // הכנס את ה-API Key שלך כאן
// //      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;
 
// //      try {
// //          const response = await axios.get(url);
// //          const weatherData = response.data;
// //          console.log(weatherData);
// //          return weatherData;
// //      } catch (error) {
// //          console.error('Error fetching weather data:', error);
// //          return null;
// //      }
// //  };
 
//  // קריאה לפונקציה



 
//  getWeather('Jerusalem');
 
//  app.get('/weather/:city', async (req, res) => {
//      const { city } = req.params;
//      const apiKey = '47fa8cac82de9fb95d74187722119d68';  // המפתח שלך
//      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;
 
//      try {
//          const response = await axios.get(url);
//          res.json(response.data);
//      } catch (error) {
//          console.error('Error fetching weather:', error);
//          res.status(500).json({ message: 'שגיאה בהבאת מזג האוויר' });
//      }
//  });
 
//  app.get('/weather/:city', async (req, res) => {
//      const city = req.params.city;
//      const weatherData = await getWeather(city);
//      if (weatherData) {
//          res.json(weatherData);
//      } else {
//          res.status(500).json({ message: 'שגיאה בהבאת מזג האוויר' });
//      }
//  });
 
//  app.get('/weather', async (req, res) => {
//      const city = req.query.city || 'Jerusalem';
//      const weather = await getWeather(city);
//      if (weather) {
//          res.json(weather);
//      } else {
//          res.status(500).json({ error: 'לא ניתן לשלוף נתונים.' });
//      }
//  });
 
 
//  // דוגמה לשליפת מזג האוויר עבור תל אביב
//  getWeather('Jerusalem').then((weather) => {
//      if (weather) {
//          console.log(`מזג האוויר ב-${weather.city}:`);
//          console.log(`טמפרטורה: ${weather.temperature}°C`);
//          console.log(`תיאור: ${weather.description}`);
//          console.log(`לחות: ${weather.humidity}%`);
//      } else {
//          console.log("לא ניתן לשלוף נתונים.");
//      }
//  })
 

//  // Route for weather information
//  router.get('/:city', async (req, res) => {
//      const city = req.params.city;
//      const weatherData = await getWeather(city);
//      if (weatherData) {
//          res.json(weatherData);
//      } else {
//          res.status(500).json({ message: 'שגיאה בהבאת מזג האוויר' });
//      }
//  });
 
//  // Export the router to use it in the app
//  module.exports = router;