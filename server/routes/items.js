const express=require("express")
const router=express.Router()
const Item=require("../models/items")
 
const {addItem,updateItem,getItemById,deletItem, getItemsByCategoryId} =require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");

// router.post('/',addItem);
// router.get('/:id',uploudPic.single('image'),getItemById);
// router.get('/:categoryId',getItemsByCategoryId);
// router.patch('/:id',updateItem);
// router.delete('/:id',deletItem)

module.exports=router;