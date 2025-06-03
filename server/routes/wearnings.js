const express = require("express")
const { addWearning, getEventWearByItemId } = require("../controllers/wearnings");
const router = express.Router()

router.post('/',addWearning);
router.get('/:item_id', getEventWearByItemId);


module.exports = router

