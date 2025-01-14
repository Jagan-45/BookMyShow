const sequelize=require('./config/database')
const Screens=require('./Screens')
const Theatre=require('./Theatre')
const Movies=require('./Movies')

const Shows=sequelize.define('Shows',{
    show_id:{
        type:sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    screen_id:{
        type:sequelize.DataTypes.INTEGER,
        references:{
            model:Screens,
            key:'screen_id'
        },
        allowNull:false
    },
    theatre_id:{
        type:sequelize.DataTypes.INTEGER,
        references:{
            model:Theatre,
            key:'theatre_id'
        },
        allowNull:false
    },
    movie_id:{
        type:sequelize.DataTypes.INTEGER,
        references:{
            model:Movies,
            key:'movie_id'
        },
        allowNull:false
    },
    show_time:{
        type:sequelize.DataTypes.DATE,
        allowNull:false
    },
    ticket_release_time:{
        type:sequelize.DataTypes.DATE,
        allowNull:false
    },
    block_price:{
        type:sequelize.DataTypes.JSON,
        allowNull:false
    },
    tickets_available:{
        type:sequelize.DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports={Shows}