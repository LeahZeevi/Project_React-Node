const express = require("express")
const router = express.Router()
const { register, login, getAllCities, getMyPIc, getUserById } = require('../controllers/users')


console.log("enter rout user");
router.post('/', register)
router.get('/uploadsPic/:image', getMyPIc);
router.get('/excel-column', getAllCities)
router.get('/:_id', getUserById);
router.post('/login', login)
module.exports = router;
