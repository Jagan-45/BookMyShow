const {z} = require('zod');


const validateRegisterSchema=(req,res,next)=>{
    try{
        registerSchema.parse(req.body);
        next();
    } catch(err){
        return res.status(400).json({error: err.errors.map((err)=>err.message)});
    }
}

const validateLoginSchema=(req,res,next)=>{
    try{
        loginSchema.parse(req.body);
        next();
    } catch(err){
        return res.status(400).json({error: err.errors.map((err)=>err.message)});
    }
}

const validateAdminFormSchema=(req,res,next)=>{
    try{
        AdminFormSchema.parse(req.body);
        next();
    } catch(err){
        return res.status(400).json({error:err.erros.map((err)=>err.message)});
    }
}
const validateScreenLayout=(req,res,next)=>{
    try{
        ScreenLayoutSchema.parse(req.body);
        next();
    } catch(err){
        return res.status(400).json({error:err.erros.map((err)=>err.message)});
    }
}

const validateMovieLayout=(req,res,next)=>{
    try{
        MovieLayoutSchema.parse(req.body);
        next();
    } catch(err){
        return res.status(400).json({error:err.erros.map((err)=>err.message)});
    }
}

const verifyShowLayout=(req,res,next)=>{
    try{
        ShowLayoutSchema.parse(req.body);
        next();
    } catch(err){
        return res.status(400).json({error:err.erros.map((err)=>err.message)});
    }
}

const registerSchema=z.object({
    username:z.string().min(3,'Username must be atleast 3 characters long'),
    email:z.string().email('Invalid email format'),
    password:z.string().min(6,'Password must be atleast 6 charcters long'),
})

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  });

const AdminFormSchema=z.object({
    phno:z.string().min(10,'Phone number must be atleast 10 characters').max(10,'Phone number must be atmost 10 characters'),
    email:z.string().email('Invalid email format'),
    theatre_name:z.string().min(3,'Theatre name must be atleast 3 characters long'),
    theatre_address:z.string().min(3,'Theatre address must be atleast 3 characters long'),
    state:z.string().min(3,'State must be atleast 3 characters long'),
    city:z.string().min(3,'City must be atleast 3 characters long'),
    pincode:z.string().min(6,'Pincode must be atleast 6 characters long'),
    seats:z.number().int('Seats must be an integer'),
    screens:z.number().int('Screens must be an integer'),
})
  
const ScreenLayoutSchema=z.object({
    screen_name:z.string().min(3,'Screen name must be atleast 3 characters long'),
    seats:z.number().int('Seats must be an integer'),
    seat_layout:z.json(),
})

const MovieLayoutSchema=z.object({
    movie_name:z.string().min(1,'Movie name must be atleast 3 characters long'),
    movie_duration:z.number().int('Movie duration must be an integer'),
    movie_language:z.string().min(1,'Movie language must be atleast 3 characters long'),
    movie_genre:z.string().min(1,'Movie genre must be atleast 3 characters long'),
    movie_release_date:z.date(),
    movie_description:z.string().min(1,'Movie description must be atleast 3 characters long'),
    movie_rating:z.number().int('Movie rating must be an integer'),
    movie_poster:z.string().min(1,'Movie poster must be atleast 3 characters long'),
})

const ShowLayoutSchema=z.object({
    screen_id:z.number().int('Screen id must be an integer'),
    theatre_id:z.number().int('Theatre id must be an integer'),
    movie_id:z.number().int('Movie id must be an integer'),
    show_time:z.date(),
    ticket_release_time:z.date(),
    block_price:z.json(),
    tickets_available:z.number().int('Tickets available must be an integer'),
})

module.exports = {
    validateRegisterSchema, 
    validateLoginSchema,
    validateAdminFormSchema,
    validateScreenLayout,
    validateMovieLayout,
    verifyShowLayout,

}; 