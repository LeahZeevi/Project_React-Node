require("dotenv").config()
const cors=require('cors')
const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const multer = require('multer');
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
 const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const weatherRouter = require('./routes/weather');
const userRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const historyRouter = require('./routes/history')
const wearning=require('./routes/wearnings')
const predictRoute = require('./routes/predictRoute');
const looks = require('./routes/looks');
const app=express();
require('./background/autoAssignJob');

const cachePath = path.join(__dirname, 'predictions_cache.json');
let predictionCache = {};
if (fs.existsSync(cachePath)) {
  predictionCache = JSON.parse(fs.readFileSync(cachePath));
}

app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions))
const PORT=process.env.PORT;
console.log(PORT)
app.use("/api", predictRoute);
app.use('/users', userRouter)
app.use('/items', itemsRouter)
app.use('/weather', weatherRouter); 
app.use('/history', historyRouter)
app.use('/wearnings', wearning)
app.use('/looks', looks)

app.use(express.static("public"))
app.use('/uploadsPic', express.static(path.join(__dirname, 'uploadsPic')));
    connectDB()
mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));



    
  

