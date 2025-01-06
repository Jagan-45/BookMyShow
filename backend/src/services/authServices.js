const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const  generateOTP = ()=>Math.floor(100000+Math.random()*900000).toString();

const sendEmail = async (email,subject,message) => {
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            User:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject,
        text:message,
    })
}

const generateToken = (user)=>{
    return jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET,{
        expiresIn:'1h',
    })
}

const hashPassword = async (password)=>await bcrypt.hash(password,10);

const comparePassword=async (password,hashedPassword)=> await bcrypt.compare(password,hashedPassword)

module.exports={generateOTP,sendEmail,generateToken,hashPassword,comparePassword};