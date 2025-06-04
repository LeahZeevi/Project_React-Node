const express = require("express")
const { addLook,getAllLooksByUserId,deletLook,updateNameOfLook } = require("../controllers/looks");
const router = express.Router()


router.post('/',addLook);
router.get('/:user_id',getAllLooksByUserId);
router.delete('/:_id',deletLook);
router.patch('/',updateNameOfLook);
module.exports = router