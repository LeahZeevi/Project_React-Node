const { status } = require("express/lib/response");
const User = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.register = async (req, res) => {

    const { userName, city, email, password, myWardobe } = req.body

    if (!userName || !city || !password) {
        return res.status(400).json({ message: "one or more fields is not complete" })
    }
    
    //lean(): המרה לקריאה בלבד מזרז את תהליך השאילתה
    const duplicate = await User.findOne({ userName: userName }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Dupliacated userName" + duplicate })
    }//אאולי כדאי להוסיף בדקיה סיסמא אם קיים כזה שם
    const hashPassword = await bcrypt.hash(password, 10)
    const userObject = { userName, city, email, password: hashPassword, myWardobe }    
    const user = await User.create(userObject)
    if (user){
        const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET)
        const userInfo = { _id: user._id, userName: user.userName, city: user.city, email: user.email, password: user.password, myWardobe: user.myWardrobe
            ,accessToken:accessToken
        }
        return res. status(201).json({userInfo })

    }
    else
        return res.status(400).json({ message: `Invalid user received` })
}

exports.login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: "userName or password is not complete" })
    }
    const foundUser = await User.findOne({ userName }).lean()
    if (!foundUser)
        return res.status(401).json({ message: "Unauthhorized1" })

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: "Unauthhorized2" })

      const accessToken = jwt.sign(foundUser, process.env.ACCESS_TOKEN_SECRET)
    const userInfo = { _id: foundUser._id, userName: foundUser.userName, city: foundUser.city, email: foundUser.email, password: foundUser.password, myWardobe: foundUser.myWardrobe
        ,accessToken:accessToken
    }
 
    res.json(userInfo)

}


exports.getUserByPassword = async (req, res) => {
    const { _id } = req.params

    console.log(_id);
    try {
        const user = await User.findOne({ _id })


        if (!user) {
            console.log("tamiiiiii");
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);

    } catch (error) {
        console.error('failed to ger user', error);
        res.status(500).json({ message: 'failed to get user' })
    }

}

