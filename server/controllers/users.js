const { status } = require("express/lib/response");
const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const iconv = require('iconv-lite');
const fs = require('fs')
const csv = require('csv-parser');
const path = require('path');

exports.register = async (req, res) => {
    console.log("enter register");
    const { userName, city, email, password, myWardobe } = req.body

    if (!userName || !city || !password) {
        return res.status(400).json({ message: "one or more fields is not complete" })
    }
    
    //lean(): המרה לקריאה בלבד מזרז את תהליך השאילתה
    const duplicate = await User.findOne({ userName: userName }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Dupliacated userName" })
    }//אאולי כדאי להוסיף בדקיה סיסמא אם קיים כזה שם
    const hashPassword = await bcrypt.hash(password, 10)
    const userObject = { userName, city, email, password: hashPassword, myWardobe }    
    const user = await User.create(userObject)
    if (user){
      const userToken={_id:userObject._id,userName:userObject.userName,city:userObject.city,
        email:userObject.email,password:userObject.password
      }
        const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET)
        return res. status(201).json({accessToken:accessToken,user:user})
        }
    else
        return res.status(400).json({ message: "Invalid user received" })
}

exports.login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: "userName or password is not complete" })
    }
    const foundUser = await User.findOne({ userName }).lean()
    if (!foundUser)
        return res.status(401).json({ message: "No user found with this name." })

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: "No user found with this password." })
      const userToken={_id:foundUser._id,userName:foundUser.userName,city:foundUser.city,
        email:foundUser.email,password:foundUser.password
      }
      const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET)
           return res. status(201).json({accessToken:accessToken,user:foundUser})
}


exports.getUserById = async (req, res) => {
    const { _id } = req.params
    console.log(_id);
    try {
        const user = await User.findOne({ _id})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    } catch (error) {
        console.error('failed to ger user', error);
        res.status(500).json({ message: 'failed to get user' })
    }

}

exports.getAllCities=async(req, res) => {
    
    const results = [];
    const columnName = "cityName"; // שם העמודה שאתה רוצה לשלוף
       await fs.createReadStream('./cities.csv') // קריאת הנתונים מהקובץ כזרם
      .pipe(iconv.decodeStream('win1255')) // ממיר את הקובץ ל-UTF-8
      .pipe(csv()) // העברת הנתונים דרך מנתח ה-CSV
        .on('data', (data) => {
        if (data[columnName]) {
         
            results.push(data[columnName]);
        }
      })
      .on('end', () => {
        res.json(results);
      })
      .on('error', (error) => {
        console.error('שגיאה בקריאת קובץ ה-CSV:', error);
        res.status(500).json({ error: 'אירעה שגיאה בעת קריאת קובץ ה-CSV' });
      });
  };



exports.getMyPIc = (req, res) => {
  const { image } = req.params;
  console.log('שם הקובץ המתקבל:', image);

  const imagesDir = path.join("public", "uploadsPic"); // תיקיית uploadsPic ישירות בתוך public
  const imagePath = path.join(imagesDir, image);
  console.log('נתיב מלא לתמונה:', imagePath);

  if (!fs.existsSync(imagePath)) {
    console.log('התמונה לא נמצאה בנתיב:', imagePath);
    return res.status(404).send('התמונה לא נמצאה');
  }

  res.sendFile(imagePath);
};

  