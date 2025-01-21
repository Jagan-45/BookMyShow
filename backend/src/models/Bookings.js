const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User=require('./User');
const Shows=require('./Shows');
const Movies = require('./Movies');

const Bookings = sequelize.define('Booking', {
    booking_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'user_id'
        }
    },
    show_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Shows,
            key:'show_id'
        }
    },
    movie_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Movies,
            key:'movie_id'
        }
    },
    seat_names:{
        type:DataTypes.JSON,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    block:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull:false
    },
    expired_at:{
        type:DataTypes.DATE,
        allowNull:false
    }
});

module.exports = Bookings;