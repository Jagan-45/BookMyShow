const User=require('../models/User');
const {transporter}=require('../services/authServices');
const sequelize=require('../config/database');



const {generateOTP,hashPassword,comparePassword,generateToken}=require('../services/authServices');



const register = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            otp,
            otpExpiresAt,
        });

        await transaction.commit();

        const mailOptions = {
            from: "balujgn@gmail.com",
            to: email,
            subject: 'Verify your email',
            text: `Your OTP is ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'User registered. Verify OTP sent to your email.' });
    } catch (err) {
        if (transaction.finished !== 'commit') await transaction.rollback();
        res.status(400).json({ error: err.message });
    }
};


const verifyOtp=async (req,res)=>{
    const transaction = await sequelize.transaction();
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

        await transaction.commit();

        const token=generateToken(user);
        res.status(200).json({message:'otp verified successfully',token});
    } catch(err){
        if (transaction.finished !== 'commit') await transaction.rollback();
        res.status(400).json({error:err.message});
    }
}

const resendOtp=async (req,res)=>{
    const transaction = await sequelize.transaction();
    try{
        const {email}=req.body;

        const user=await User.findOne({where:{email}});
        if(!user) return res.status(404).json({error:'User not found'});

        const otp=generateOTP();
        user.otp=otp;
        user.otpExpiresAt=new Date(Date.now()+5*60*1000);
        await user.save();

        await transaction.commit();

        console.log(process.env.EMAIL_PASS)
        const mailOptions={
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Verify your email',
            text:`Your OTP is ${otp}`,
        }
        transporter.sendMail(mailOptions);
        res.status(200).json({message:'OTP resent successfully'});
    } catch(err){
        if (transaction.finished !== 'commit') await transaction.rollback();
        res.status(400).json({error:err.message});
    }

}

const login=async(req,res)=>{
    const transaction = await sequelize.transaction();
    try{
        const {email,password}=req.body;

        const user=await User.findOne({where:{email}});
        if(!user) return res.status(404).json({error:'User not found'});

        if(!user.isVerified) return res.status(403).json({error:'User not verified'});

        const isPasswordValid=await comparePassword(password,user.password);
        if(!isPasswordValid) return res.status(401).json({error:'Invalid credentials'});

        const token=generateToken(user);
        await transaction.commit();
        res.cookie('authorization', "bearer "+token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // const tokencheck="bearer "+token;
        // console.log(tokencheck.split(' ')[1]);
        res.status(200).json({message:'Login Successfull',token});
    } catch(err){
        if (transaction.finished !== 'commit') await transaction.rollback();
        res.status(400).json({error:err.message});
    }
}

module.exports={register,verifyOtp,resendOtp,login};