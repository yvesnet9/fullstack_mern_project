import express from 'express';
import mongoose from 'mongoose';



const app = express();

import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connection reussi')
}).catch((err)=>{
    console.log('connexion non reussi', err)
})


app.listen(3000,()=>{
    console.log('le serveur est éxecuté sur le port 3000!');
})