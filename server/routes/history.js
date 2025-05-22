const express = require("express")
const { addHistoryItem, getEventWearByItemId } = require("../controllers/history")
const router = express.Router()


router.post('/',addHistoryItem);
router.get('/:item_id', getEventWearByItemId);
module.exports = router

