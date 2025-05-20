const express = require("express");
const router = express.Router();
const multer = require("multer");
const {predictCategory} = require("../controllers/items");
const uploudPic = require("../middlwares/uploudPic");

// const upload = multer({ dest: "uploads/" }); // שמירה זמנית
router.post("/predict", uploudPic.single("image"), predictCategory);


module.exports = router;
