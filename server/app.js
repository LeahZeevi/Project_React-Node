require("dotenv").config()
const express=require('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const app=express();
const cors=require('cors')
app.use(bodyParser.json());
app.use(express.json());
const userRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const PORT=3000;
console.log(PORT)
app.use('/users', userRouter)
app.use('/items', itemsRouter)
app.use(cors(corsOptions))
app.use(express.static("public"))
connectDB()


mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));
 




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
// const axios = require('axios');
// const express = require('express');

// app.get('/weather/:city', async (req, res) => {
//     const { city } = req.params;
//     const apiKey = 'your_api_key';  // המפתח שלך
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=he`;

//     try {
//         const response = await axios.get(url);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching weather:', error);
//         res.status(500).json({ message: 'שגיאה בהבאת מזג האוויר' });
//     }
// });


