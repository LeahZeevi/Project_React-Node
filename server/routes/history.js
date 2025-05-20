const express = require("express")
const { addHistoryItem, getEventWearByItemName } = require("../controllers/history")
const router = express.Router()


router.post('/',addHistoryItem);
router.get('/:itemName', getEventWearByItemName);
module.exports = router

