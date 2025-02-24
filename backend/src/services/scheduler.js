const schedule=require('node-schedule');
const cloneSeatLayoutToRedis=require('./SeatServices');
const removeSeatLayoutFromRedis=require('./SeatServices');


const scheduleSeatLayoutJob = async (show) => {
    const {show_id,ticket_release_time}=show;
    const release_time=new Date(ticket_release_time);

    if(release_time>new Date()){
        schedule.scheduleJob(release_time,async () => {
            console.log(`Cloning seat layout to Redis for show ${show_id} at ${release_time}`);
            await cloneSeatLayoutToRedis(show_id);
        });
        console.log(`Job successfully scheduled for show ${show_id} at ${release_time}`);
    } else {
        console.warn(`Ticket release time for show ${show_id} is in the past. No job scheduled.`);
    }
}

const scheduleSeatRemovalAfterShow = async (show) => {
    const {show_id,show_time}=show;
    const release_time=new Date(show_time);

    schedule.scheduleJob(release_time,async () => {
        console.log(`Removing seat layout from Redis for show ${show_id} at ${release_time}`);
        await removeSeatLayoutFromRedis(show_id);
    });
}

module.exports=scheduleSeatLayoutJob;