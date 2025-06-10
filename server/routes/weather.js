const express=require("express")
console.log("enter weather 1");

const router=express.Router()
const {getWeather} =require("../controllers/weather");
router.get('/:city', getWeather)


module.exports=router;