const express=require('express')
const sequelize=require('./config/database')
const authRoutes=require('./routes/authRoutes')

const app=express()
app.use(express.json())

app.use('/api/v0/auth',authRoutes)

sequelize.sync({force:false}).then(()=>{
    console.log("Database connected");
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    }
    )
}).catch((err)=>console.log('Erro connecting to DB',err));