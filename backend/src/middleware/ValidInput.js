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
        return res.status(400).json({error: error.errors.map((err)=>err.message)});
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
  
module.exports = { validateRegisterSchema, validateLoginSchema };