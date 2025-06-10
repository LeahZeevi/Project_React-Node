const express = require("express");
const router = express.Router();
const multer = require("multer");
const {predictCategory} = require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");

router.post("/predict", uploudPic.single("image"), predictCategory);


module.exports = router;
