const express=require("express")
const router=express.Router()
const Item=require("../models/items")
const verifyJWT=require("../middlwares/verifyJWT")


const {addItem,updateItem,getItemById,deletItem, getItemsByCategoryId} =require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");

// router.post('/',addItem);
router.post('/',verifyJWT, uploudPic.single('image'), addItem);  // שימוש במולטר להעלאת תמונה
router.get('/:id',verifyJWT, getItemById);

// router.get('/:id',uploudPic.single('image'),getItemById);
router.get('/:categoryId',verifyJWT, getItemsByCategoryId);
router.patch('/:id',verifyJWT, updateItem);
router.delete('/:id',verifyJWT, deletItem);

module.exports=router;


