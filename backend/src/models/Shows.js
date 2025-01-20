const {DataTypes}=require('sequelize')
const sequelize=require('../config/database')
const Screens=require('./Screens')
const Theatre=require('./Theatre')
const Movies=require('./Movies')
const scheduleSeatLayoutJob = require('../services/scheduler');


const Shows=sequelize.define('Show',{
    show_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    screen_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Screens,
            key:'screen_id'
        },
        allowNull:false
    },
    theatre_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Theatre,
            key:'theatre_id'
        },
        allowNull:false
    },
    movie_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Movies,
            key:'movie_id'
        },
        allowNull:false
    },
    show_time:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ticket_release_time:{
        type:DataTypes.DATE,
        allowNull:false
    },
    block_price:{
        type:DataTypes.JSON,
        allowNull:false
    },
    tickets_available:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
{
    hooks:{
        afterCreate: async (show) => {
            console.log(`New show created: ${show.show_id} Scheduling job for ticket release`);
            await scheduleSeatLayoutJob(show);
        }
    }
}

);


module.exports = Shows;