const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')
const Theatre=require('./Theatre')


const Screens=sequelize.define('Screen',{
    screen_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    theatre_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Theatre,
            key:'theatre_id'
        },
        allowNull:false
    },
    screen_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    seats:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    seat_layout:{
        type:DataTypes.JSON,
        allowNull:false
    }
});


module.exports=Screens;