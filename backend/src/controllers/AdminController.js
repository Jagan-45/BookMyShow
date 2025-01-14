const { transporter } = require('../services/authServices');
const sequelize = require('../config/database');
const { Theatre } = require('../models/Theatre');
const { Screens } = require('../models/Screens');
const { Movies } = require('../models/Movies');

const TheatreFormKyc = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { phno, email, theatre_name, theatre_address, state, city, pincode, seats, screens } = req.body;
        const FindTheatre = await Theatre.findOne({ where: { email } });
        if (FindTheatre) throw new Error('Theatre already exists with this email');

        const user = req.user;
        const owner = await Theatre.create({
            user_id: user.id,
            phno,
            email,
            theatre_name,
            theatre_address,
            state,
            city,
            pincode,
            seats,
            screens,
            isverified: false,
        });

        await owner.save();
        const row = await Theatre.findOne({ where: { theatre_name } });

        await transaction.commit();

        const VERIFY_KYC_URL = `http://localhost:5173/theatre/kyc/${row.theatre_id}/${row.theatre_name}`;
        const mailOptions = {
            from: email,
            to: "balujgn@gmail.com",
            subject: `Theatre KYC for ${row.theatre_name}`,
            html: `
                <p>This is to verify the KYC of <strong>${row.theatre_name}</strong> with the following details:</p>
                <a href="${VERIFY_KYC_URL}" style="display: inline-block; text-decoration: none; background-color: #007BFF; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; transition: background-color 0.3s ease, transform 0.2s ease;" onmouseover="this.style.backgroundColor='#0056b3'; this.style.transform='scale(1.05)';" onmouseout="this.style.backgroundColor='#007BFF'; this.style.transform='scale(1)';">Verify KYC</a>
                <p>Alternatively, click <a href="${VERIFY_KYC_URL}">here</a> to verify.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Theatre KYC submitted successfully. Please wait until the admin verifies your KYC.' });
    } catch (err) {
        if (transaction.finished !== 'commit') await transaction.rollback();
        return res.status(400).json({ error: err.message });
    }
};

const KYCPage = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id, name } = req.params;
        const theatre = await Theatre.findOne({ where: { theatre_id: id, theatre_name: name } });
        if (!theatre) throw new Error('Theatre not found');

        await transaction.commit();
        res.json({ theatre });
    } catch (err) {
        if (transaction.finished !== 'commit') await transaction.rollback();
        return res.status(400).json({ error: err.message });
    }
};

const VerifyKyc = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { isOk, theatre_id } = req.body;
        const theatre = await Theatre.findOne({ where: { theatre_id } });
        if (!theatre) throw new Error('Theatre not found');

        const email = theatre.email;

        if (isOk) {
            theatre.isverified = true;
        } else {
            const result = await Theatre.destroy({ where: { theatre_id } });
            if (result === 0) throw new Error('Failed to delete theatre');

            const sendMail = {
                from: "balujgn@gmail.com",
                to: email,
                subject: `Theatre KYC Rejected`,
                html: `<p>Your KYC for <strong>${theatre.theatre_name}</strong> has been rejected. Please submit your KYC again.</p>`,
            };

            await transporter.sendMail(sendMail);
             res.status(200).json({ message: 'Theatre deleted successfully' });
        }

        await theatre.save();
        await transaction.commit();

        const sendMail = {
            from: "balujgn@gmail.com",
            to: email,
            subject: `Theatre KYC Verified`,
            html: `<p>Your KYC for <strong>${theatre.theatre_name}</strong> has been verified. You can now start using our services.</p>`,
        };

        await transporter.sendMail(sendMail);
        res.status(200).json({ message: 'Theatre KYC verified successfully' });
    } catch (err) {
        if (transaction.finished !== 'commit') await transaction.rollback();
        return res.status(400).json({ error: err.message });
    }
};

const AddScreen = async (req, res) => {
    const transaction=await sequelize.transaction();
    try{
        const {theatre_id,screen_name,seats,seat_layout}=req.body;
        const theatre=await Theatre.findOne({where:{theatre_id}});
        if(!theatre) throw new Error('Theatre not found');
        const screen=await Screens.create({
            theatre_id,
            screen_name,
            seats,
            seat_layout
        })
        screen.save();
        await transaction.commit();
        res.status(201).json({message:'Screen added successfully'});
    } catch(err){
        if(transaction.finished !== 'commit') await transaction.rollback();
        return res.status(400).json({error:err.message});
}
}

const AddMovies = async (req, res) => {
    const transaction=await sequelize.transaction();
    try{
        const {
            theatre_id,movie_name,movie_duration,
            movie_language,movie_genre,
            movie_release_date,movie_description,
            movie_rating,movie_poster
            }=req.body;
        const theatre=await Theatre.findOne({where:{theatre_id}});
        if(!theatre) throw new Error('Theatre not found');
        const movie=await Movies.create({
            movie_name,
            theatre_id,
            movie_duration,
            movie_language,
            movie_genre,
            movie_release_date,
            movie_description,
            movie_rating,
            movie_poster
        })
        movie.save();
        await transaction.commit();
        res.status(201).json({message:'Movie added successfully'});
    } catch(err){
        if(transaction.finished !== 'commit') await transaction.rollback();
        return  res.status(400).json({error:err.message});
    }
}

const AddShows = async (req, res) => {
    const transaction=sequelize.transaction();
    try{
        const {screen_id,theatre_id,show_time,movie_id,ticket_release_time,block_price,tickets_available}=req.body;
        const theatre=await Theatre.findOne({where:{theatre_id}});
        if(!theatre) throw new Error('Theatre not found');
        const screen=await Screens.findOne({where:{screen_id}});
        if(!screen) throw new Error('Screen not found');
        const movie=await Movies.findOne({where:{movie_id}});
        if(!movie) throw new Error('Movie not found');
        const show=await Shows.create({
            screen_id,
            theatre_id,
            show_time,
            movie_id,
            ticket_release_time,
            block_price,
            tickets_available
        })
        show.save();
        await transaction.commit();
        res.status(201).json({message:'Show added successfully'});
    } catch(err){
        if(transaction.finished !== 'commit') await transaction.rollback();
        return res.status(400).json({error:err.message});
    }
}

module.exports = {
    TheatreFormKyc,
    KYCPage,
    VerifyKyc,
    AddScreen,
    AddMovies,
    AddShows,
};
