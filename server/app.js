require("dotenv").config()
const cors=require('cors')
const express = require('express');
const path = require('path');

const multer = require('multer'); // *** הוסף את השורה הזו ***
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
 const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const weatherRouter = require('./routes/weather');
const userRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const app=express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions))
const PORT=process.env.PORT;
console.log(PORT)
// app.use("/uploadsPic", express.static("uploadsPic")); // תיקיית התמונות
// app.use('/weather', weather);
app.use('/users', userRouter)
app.use('/items', itemsRouter)
app.use('/weather', weatherRouter); 
app.use(express.static("public"))
// בשרת Node.js (backend)
app.use('/uploadsPic', express.static(path.join(__dirname, 'uploadsPic')));

// app.use("/api/auth",require("./routes/authRouter"))//לא ברור מה החלק הראשון



//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, 'uploads_node');
//         },
//         filename: (req, file, cb) => {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//         }
//     });
    
//     const upload = multer({ storage: storage });


//     app.post('/upload-and-predict', upload.single('image'), async (req, res) => {
//         // כאן הקוד שמשתמש ב-await
//         try {
//             const pythonApiUrl = 'http://localhost:5000/predict';
//             const formData = new FormData();
//             formData.append('image', fs.createReadStream(req.file.path), req.file.originalname);
    
//             const response = await axios.post(pythonApiUrl, formData, {
//                 headers: {
//                     ...formData.getHeaders(),
//                 },
//             });
    
//             fs.unlinkSync(req.file.path);
//             res.json(response.data);
//         } catch (error) {
//             console.error('Error communicating with Python API:', error);
//             res.status(500).send('Error classifying image.');
//         }
//     });

    connectDB()

mongoose.connect(process.env.CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));



    
    const { execFile } = require("child_process");
    const fs = require("fs");
    
    const upload = multer({ dest: "public/uploadsPic/" });
    
    app.post("/upload", upload.single("image"), (req, res) => {
      const imagePath = path.resolve(req.file.path);
    
      execFile("python3", ["predict.py", imagePath], (err, stdout, stderr) => {
        fs.unlinkSync(imagePath); // מוחקים את הקובץ הזמני
    
        if (err) {
          return res.status(500).send("Error running prediction");
        }
    
        res.json({ label: stdout.trim() });
      });
    });


