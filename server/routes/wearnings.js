const express = require("express")
const { addWearning, getEventWearByItemId } = require("../controllers/wearnings");
const router = express.Router()
const verifyJWT=require("../middlwares/verifyJWT")
router.post('/',verifyJWT,addWearning);
router.get('/:item_id',verifyJWT, getEventWearByItemId);


module.exports = router

