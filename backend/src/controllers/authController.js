const User = require('../models/User');
const { transporter } = require('../services/authServices');
const sequelize = require('../config/database');
const { generateOTP, hashPassword, comparePassword, generateToken } = require('../services/authServices');

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

        if(!user) throw new Error('User not created');

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
        return res.status(400).json({ error: err.message });
    }
};

const verifyOtp = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) throw new Error('User not found');
        if (user.otp !== otp || new Date() > user.otpExpiresAt) {
            throw new Error('Invalid or expired OTP');
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        await transaction.commit();

        const token = generateToken(user);
        if(!token) throw new Error('Token not generated');
        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (err) {
        if (transaction.finished !== 'commit') await transaction.rollback();
        return res.status(400).json({ error: err.message });
    }
};

const resendOtp = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        await transaction.commit();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your email',
            text: `Your OTP is ${otp}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (err) {
        if (transaction.finished !== 'commit') await transaction.rollback();
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');
        if (!user.isVerified) throw new Error('User not verified');

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        const token = generateToken(user);
        await transaction.commit();

        res.cookie('authorization', "bearer " + token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login Successful', token });
    } catch (err) {
        if (transaction.finished !== 'commit') await transaction.rollback();
        res.status(400).json({ error: err.message });
    }
};

module.exports = { register, verifyOtp, resendOtp, login };
