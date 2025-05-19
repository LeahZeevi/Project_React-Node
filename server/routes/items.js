
const express=require("express")


const router=express.Router()
 const Item=require("../models/items")
const verifyJWT=require("../middlwares/verifyJWT")
const {addItem,updateItem,deletItem, getAllItemsById, getItemById} =require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");
const { route } = require("./weather");


router.post('/:_id',uploudPic.single('url'),addItem);
 router.get('/:_id',verifyJWT,getItemById);
router.get('/AllIems/:_id',verifyJWT,getAllItemsById);
router.patch('/:_id',verifyJWT,updateItem);
router.delete('/:_id',verifyJWT,deletItem);
module.exports=router;
