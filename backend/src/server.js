const express=require('express')
const sequelize=require('./config/database')
const authRoutes=require('./routes/authRoutes')
const AdminRoutes=require('./routes/AdminRoutes')

const app=express()
app.use(express.json())

app.use('/api/v0/auth',authRoutes)
app.use('/api/v0/admin',AdminRoutes)

sequelize.sync({force:false}).then(()=>{
    console.log("Database connected");
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    }
    )
}).catch((err)=>console.log('Error connecting to DB',err));