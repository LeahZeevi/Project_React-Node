const express = require("express")
const { addHistoryItem } = require("../controllers/history")
const router = express.Router()

const verifyJWT=require("../middlwares/verifyJWT")
router.post('/',verifyJWT,addHistoryItem);
module.exports = router

