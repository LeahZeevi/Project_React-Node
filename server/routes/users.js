const express=require("express")
const router=express.Router()
const{getUserByPassword,register,login,getAllCities,getMyPIc}=require('../controllers/users')
// const verifyJWT=require("../middlwares/verifyJWT")
// router.post('/',addUser);


router.get('/uploadsPic/:url', getMyPIc); // שינוי הנתיב כדי להתאים למיקום התמונותrouter.post('/',register);
router.get('/excel-column',getAllCities )
 router.post('/login',login)
 router.get('/:_id',getUserByPassword);
module.exports=router;
