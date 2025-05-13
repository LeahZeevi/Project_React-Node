const express = require("express")
const router = express.Router()
const { register, login, getAllCities, getMyPIc, getUserById } = require('../controllers/users')
// const verifyJWT=require("../middlwares/verifyJWT")
// router.post('/',addUser);

console.log("enter rout user");
router.get('/:_id', getUserById);
router.post('/', register)
router.get('/uploadsPic/:url', getMyPIc); // שינוי הנתיב כדי להתאים למיקום התמונותrouter.post('/',register);
router.get('/excel-column', getAllCities)
router.post('/login', login)
module.exports = router;
