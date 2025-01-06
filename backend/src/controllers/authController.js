const User=require('../models/User');

const {generateOTP,sendEmail,hashPassword,comparePassword,generateToken}=require('../services/authServices');

exports.register = async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        const hashedPassword=await hashPassword(password);

        const otp=generateOTP();
        const otpExpiresAt=new Date(Date.now()+5*60*1000);

        const user=await User.create({
            username,
            email,
            password:hashedPassword,
            otp,
            otpExpiresAt,
        })

        await sendEmail(email,'Your otp for verification',`Your OTP is:${otp}`);

        res.status(201).json({message:'user registered. verify otp sent to your email.'});
    } catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.verifyOtp=async (req,res)=>{
    try{
        const {email,otp}=req.body;
        const user= await User.findOne({where:{email}});

        if(!user) return res.status(404).json({error:'user not found'});

        if(user.otp!==otp || new Date()>user.otpExpiresAt){
            return res.status(400).json({error:'Invalid or expired OTP'});
        }

        user.isVerified=true;
        user.otp=null;
        user.otpExpiresAt=null;
        await user.save();

        const token=generateToken(user);
        res.status(200).json({message:'otp verified successfully',token});
    } catch(err){
        res.status(400).json({error:err.message});
    }
}

exports.resendOtp=async (req,res)=>{
    try{
        const {email}=req.body;

        const user=await User.findOne({where:{email}});
        if(!user) return res.status(404).json({error:'User not found'});

        const otp=generateOTP();
        user.otp=otp;
        user.otpExpiresAt=new Date(Date.now()+5*60*1000);
        await user.save();

        await sendEmail(email,'Your otp for verification',`Your OTP is:${otp}`);
        res.status(200).json({message:'OTP resent successfully'});
    } catch(err){
        res.status(400).json({error:err.message});
    }

}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({where:{email}});
        if(!user) return res.status(404).json({error:'User not found'});

        if(!user.isVerified) return res.status(403).json({error:'User not verified'});

        const isPasswordValid=await comparePassword(password,user.password);
        if(!isPasswordValid) return res.status(401).json({error:'Invalid credentials'});

        const token=generateToken(user);

        res.status(200).json({message:'Login Successfull',token});
    } catch(err){
        res.status(400).json({error:err.message});
    }
}