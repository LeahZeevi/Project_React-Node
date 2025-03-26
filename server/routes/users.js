const express=require("express")
const router=express.Router()
const{getUserByPassword,addUser}=require('../controllers/users')

router.post('/',addUser);
router.get('/:_id',getUserByPassword);

module.exports=router;
