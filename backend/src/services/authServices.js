const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    transporter,
    generateOTP,
    generateToken,
    hashPassword,
    comparePassword,
};
