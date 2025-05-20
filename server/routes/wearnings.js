const express = require("express")
const { addWearning } = require("../controllers/wearnings");
const router = express.Router()

router.post('/',addWearning);
module.exports = router

