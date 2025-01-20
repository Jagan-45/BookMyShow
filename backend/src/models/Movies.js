const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')
const Theatre=require('./Theatre')

const Movies=sequelize.define('Movie',{
    movie_id:{
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
    movie_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    movie_duration:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    movie_language:{
        type:DataTypes.STRING,
        allowNull:false
    },
    movie_genre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    movie_release_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    movie_description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    movie_rating:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    movie_poster:{
        type:DataTypes.BLOB,
        allowNull:false
    },
    
});


module.exports=Movies;