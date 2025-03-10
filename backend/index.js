import express from 'express';


const app = express();

app.listen(3000,()=>{
    console.log('le serveur est éxecuté sur le port 3000!');
})