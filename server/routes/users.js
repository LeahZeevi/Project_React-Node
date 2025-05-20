const express = require("express")
const router = express.Router()
const { register, login, getAllCities, getMyPIc, getUserById } = require('../controllers/users')
// const verifyJWT=require("../middlwares/verifyJWT")
// router.post('/',addUser);

console.log("enter rout user");
router.post('/', register)
router.get('/uploadsPic/:image', getMyPIc); // שינוי הנתיב כדי להתאים למיקום התמונותrouter.post('/',register);
router.get('/excel-column', getAllCities)
router.get('/:_id', getUserById);
router.post('/login', login)
module.exports = router;
