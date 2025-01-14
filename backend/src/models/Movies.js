const sequelize=require('./config/database')
const Theatre=require('./Theatre')

const Movies=sequelize.define('Movies',{
    movie_id:{
        type:sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    theatre_id:{
        type:sequelize.DataTypes.INTEGER,
        references:{
            model:Theatre,
            key:'theatre_id'
        },
        allowNull:false
    },
    movie_name:{
        type:sequelize.DataTypes.STRING,
        allowNull:false
    },
    movie_duration:{
        type:sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    movie_language:{
        type:sequelize.DataTypes.STRING,
        allowNull:false
    },
    movie_genre:{
        type:sequelize.DataTypes.STRING,
        allowNull:false
    },
    movie_release_date:{
        type:sequelize.DataTypes.DATE,
        allowNull:false
    },
    movie_description:{
        type:sequelize.DataTypes.STRING,
        allowNull:false
    },
    movie_rating:{
        type:sequelize.DataTypes.FLOAT,
        allowNull:false
    },
    movie_poster:{
        type:sequelize.DataTypes.BLOB,
        allowNull:false
    },
    
});

module.exports={Movies}