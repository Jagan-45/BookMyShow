const express=require('express');

const router=express.Router();

const {TheatreFormKyc,KYCPage,VerifyKyc,AddScreen,AddMovies,AddShows}=require('../controllers/AdminController');
const {validateAdminFormSchema,validateScreenLayout,validateMovieLayout,verifyShowLayout}=require('../middleware/ValidInput');
const {verifyToken}=require('../middleware/authMiddleware');


router.post('/AddTheatre',verifyToken,validateAdminFormSchema,TheatreFormKyc);

router.get('/KYCPage/:id/:name',KYCPage);

router.post('/VerifyKyc',VerifyKyc);

router.post('/:theatre_id/AddScreen',verifyToken,validateScreenLayout,AddScreen);

router.post('/:theatre_id/AddMovies',verifyToken,validateMovieLayout,AddMovies);

router.post('/:theatre_id/:screen_id/AddShows',verifyToken,verifyShowLayout,AddShows);

module.exports=router;