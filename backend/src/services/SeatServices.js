// services/SeatServices.js
const redis = require('../config/redis');
// const { Shows, Screens } = require('../models'); 
const cloneSeatLayoutToRedis = async (showId) => {
    const Shows = require('../models/Shows');
    const Screens = require('../models/Screens');
    try {
        // console.log(User);
         console.log(Screens); 
        const show = await Shows.findOne({ where: { show_id: showId }, raw: true });
        if (!show) throw new Error('Show not found');
         const screen = await Screens.findOne({ where: { screen_id: show.screen_id }, raw: true });
         if (!screen) throw new Error('Screen not found');
        const redisKey = `seat_layout:show:${showId}`;
        await redis.set(redisKey, JSON.stringify(screen.seat_layout));
        console.log('Seat layout cloned to Redis:', redisKey);
    } catch (err) {
        console.error('Error cloning seat layout to Redis:', err);
    }
};

module.exports = cloneSeatLayoutToRedis;