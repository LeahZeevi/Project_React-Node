// require("dotenv").config()
// const express=require('express')
// // const axios = require('axios');
// const mongoose=require('mongoose')
// const bodyParser = require('body-parser');
// const crypto = require('crypto');
// const app=express();
// const cors=require('cors')
// app.use(bodyParser.json());
// app.use(express.json());
// const userRouter = require('./routes/users')
// const itemsRouter = require('./routes/items')
// const weather = require('./server/weather');

// const corsOptions=require("./config/corsOptions")
// const connectDB=require("./config/dbConn")


// const PORT=3000;
// console.log(PORT)
// app.use("/uploadsPic", express.static("uploadsPic")); // תיקיית התמונות
// // app.use('/weather', weather);
// app.use('/users', userRouter)
// app.use('/items', itemsRouter)
// app.use(cors(corsOptions))
// app.use(express.static("public"))
// // app.use("/api/auth",require("./routes/authRouter"))//לא ברור מה החלק הראשון
// connectDB()


// mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
//     ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
//     .catch((error)=>console.log(error.message));
 
// weather.dataweather();
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const weatherRouter = require('./server/weather'); // Import the weather module

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Static file and route setup
app.use('/uploadsPic', express.static("uploadsPic"));
app.use('/users', userRouter);
app.use('/items', itemsRouter);
app.use('/weather', weatherRouter); // Use the weather router here

const connectDB = require("./config/dbConn");
connectDB();

mongoose.connect(process.env.CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));