const express = require("express")
const { addHistoryItem } = require("../controllers/history")
const router = express.Router()


router.post('/',addHistoryItem);
module.exports = router

