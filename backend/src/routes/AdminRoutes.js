const express=require('express');

const router=express.Router();

const {TheatreFormKyc,KYCPage}=require('../controllers/AdminController');
const {validateAdminFormSchema,}=require('../middleware/ValidInput');
const {verifyToken}=require('../middleware/authMiddleware');


router.post('/AddTheatre',verifyToken,validateAdminFormSchema,TheatreFormKyc);

router.get('/KYCPage/:id/:name',KYCPage);