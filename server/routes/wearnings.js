const express = require("express")
const { addWearning } = require("../controllers/wearnings");
const router = express.Router()

router.post('/',addWearning);
router.get('/:item_Id',get);

module.exports = router

