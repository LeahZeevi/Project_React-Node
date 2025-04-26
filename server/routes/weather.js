const express=require("express")
console.log("enter weather 1");

const router=express.Router()
// const verifyJWT=require("../middlwares/verifyJWT")
const {getWeather} =require("../controllers/weather");
router.get('/:city', getWeather)


module.exports=router;