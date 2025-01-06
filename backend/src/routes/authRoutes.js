const express=require('express');

const {verifyOTP,resendOTP,register,login}=require('../controllers/authController');
const {valiidateSchema,registerSchema,loginSchema} = require('../middleware/ValidInput');

const router=express.Router();
router.post('/login',valiidateSchema(loginSchema),login);
router.post('/register',valiidateSchema(registerSchema),register);

router.post('/verify',verifyOTP);
router.post('/resend',resendOTP);

module.exports=router;
