
const express=require("express")


const router=express.Router()
 const Item=require("../models/items")
const verifyJWT=require("../middlwares/verifyJWT")
const {addItem,deletItem, getAllItemsById, getItemById, updateItemInUse, updateItemInLaundryBasket} =require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");
const { route } = require("./weather");


router.post('/:_id',uploudPic.single('image'),addItem);
 router.get('/:_id',verifyJWT,getItemById);
router.get('/AllIems/:_id',verifyJWT,getAllItemsById);
router.patch('/',verifyJWT,updateItemInUse);
router.patch('/inLaundryBasket',verifyJWT,updateItemInLaundryBasket);
router.delete('/:_id',verifyJWT,deletItem);
module.exports=router;
