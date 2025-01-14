const sequelize=require('./config/database')
const Theatre=require('./Theatre')

const Screens=sequelize.define('Screens',{
    screen_id:{
        type:sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    theare_id:{
        type:sequelize.DataTypes.INTEGER,
        references:{
            model:Theatre,
            key:'theatre_id'
        },
        allowNull:false
    },
    screen_name:{
        type:sequelize.DataTypes.STRING,
        allowNull:false
    },
    seats:{
        type:sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    seat_layout:{
        type:sequelize.DataTypes.JSON,
        allowNull:false
    }
});

module.exports={Screens}