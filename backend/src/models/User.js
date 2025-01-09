const {DataTypes} = require('sequelize');

const sequelize=require('../config/database');

const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    otp:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    otpExpiresAt:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
})

module.exports=User;