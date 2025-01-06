const express=require('express');

const {verifyOtp,resendOtp,register,login}=require('../controllers/authController');
const {validateRegisterSchema,validateLoginSchema} = require('../middleware/ValidInput');

const router=express.Router();
router.post('/login',validateLoginSchema,login);
router.post('/register',validateRegisterSchema,register);

router.post('/verify',verifyOtp);
router.post('/resend',resendOtp);

module.exports=router;
