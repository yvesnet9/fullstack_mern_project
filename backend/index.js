import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(express.json())
app.use(cookieParser())


mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connection reussi')
}).catch((err)=>{
    console.log('connexion non reussi', err)
})


app.listen(3000,()=>{
    console.log('le serveur est éxecuté sur le port 3000!');
})

//utilisation toute les routes

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

//middlware pour la gestion d'erreur

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false, 
        statusCode,
        message,
    })
})