const express=require("express")
const router=express.Router()
const{getUserByPassword,register,login}=require('../controllers/users')
const verifyJWT=require("../middlwares/verifyJWT")


router.post('/',register);
router.get('/login',login)
router.get('/:_id',getUserByPassword);

module.exports=router;
