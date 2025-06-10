const express = require("express")
const { addLook,getAllLooksByUserId,deletLook,updateNameOfLook, updateLookInClothing } = require("../controllers/looks");
const router = express.Router()
const verifyJWT=require("../middlwares/verifyJWT")

router.post('/',verifyJWT,addLook);
router.get('/:user_id',verifyJWT,getAllLooksByUserId);
router.delete('/:_id',verifyJWT,deletLook);
router.patch('/',verifyJWT,updateNameOfLook);
router.patch('/update',verifyJWT,updateLookInClothing);

module.exports = router