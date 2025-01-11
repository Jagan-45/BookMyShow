const {DataTypes} = require('sequelize');
const User=require('./User');

const sequelize=require('../config/database');



const Theatre=sequelize.define('Theatre',{
        theatre_id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:'id',
            },
            allowNull:false,
        },
        phno:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        theatre_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        theatre_address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        pincode:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        seats:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        screens:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        is_verfiied:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        }
    }
);

module.exports={Theatre};