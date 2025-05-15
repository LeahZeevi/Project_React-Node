
const express=require("express")


const router=express.Router()
 const Item=require("../models/items")
const verifyJWT=require("../middlwares/verifyJWT")
const {addItem,updateItem,deletItem, getItemsByCategoryId, getAllItems} =require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");



// router.get('/',verifyJWT,getAllItems);

router.post('/:_id',uploudPic.single('url'),addItem);
 router.get('/:_id',getAllItems);
router.get('/category/:categoryId',verifyJWT,getItemsByCategoryId);
router.patch('/:_id',verifyJWT,updateItem);
router.delete('/:_id',verifyJWT,deletItem);
// router.delete('/:id',verifyJWT, deletItem);

module.exports=router;




// // router.post('/',addItem);
// // router.post('/',verifyJWT, uploudPic.single('url'), addItem);  // שימוש במולטר להעלאת תמונה
// // router.get('/:id',verifyJWT, getItemById);
// // router.get('/:categoryId',verifyJWT, getItemsByCategoryId);
// // router.patch('/:id',verifyJWT, updateItem);
// // router.delete('/:id',verifyJWT, deletItem);


