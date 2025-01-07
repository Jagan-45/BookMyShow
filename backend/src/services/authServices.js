const nodemailer = require('nodemailer');
require('dotenv').config();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter=nodemailer.createTransport(
    {
      service:'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth:{
        user:'balujgn@gmail.com',
        pass:process.env.EMAIL_PASS,
      }
    })

console.log('Transporter initialized:', transporter);

const generateToken = (user) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const hashPassword = async (password) => {
    const bcrypt = require('bcrypt');
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    transporter,
    generateOTP,
    generateToken,
    hashPassword,
    comparePassword,
};
