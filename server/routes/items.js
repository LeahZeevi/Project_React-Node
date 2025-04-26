const express=require("express")
console.log("enter rout");

const router=express.Router()
 const Item=require("../models/items")
const verifyJWT=require("../middlwares/verifyJWT")
const {addItem,updateItem,getItemById,deletItem, getItemsByCategoryId} =require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");
console.log("enter rout");



router.post('/',uploudPic.single('url'),addItem);
router.get('/:_id',getItemById);
router.get('/category/:categoryId',getItemsByCategoryId);
router.patch('/:_id',updateItem);
router.delete('/:id',verifyJWT, deletItem);

module.exports=router;



