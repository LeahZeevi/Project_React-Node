require("dotenv").config()
const express=require('express')
const axios = require('axios');
const cors=require('cors')
const router = express.Router();

 const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(express.json());
const weatherRouter = require('./routes/weather');
const userRouter = require('./routes/users')
const itemsRouter = require('./routes/items')

// const weatherRouter = require('./server/weather');
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")


const PORT=process.env.PORT;
console.log(PORT)
// app.use("/uploadsPic", express.static("uploadsPic")); // תיקיית התמונות
// app.use('/weather', weather);
app.use('/users', userRouter)
app.use('/items', itemsRouter)
app.use('/weather', weatherRouter); 


// app.use('/weather', weatherRouter); // Use the weather router here
app.use(cors(corsOptions))
app.use(express.static("public"))
// app.use("/api/auth",require("./routes/authRouter"))//לא ברור מה החלק הראשון
connectDB()

mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));

