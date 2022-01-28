import express from 'express';
import apiRoute , {apiProtected} from './routes/api.js';
import mongoose from 'mongoose';
import {DB_CONNECT} from './utils/constansts.js'
import AuthMiddleware from './middlewares/AuthMiddleware.js';

const app = express();

mongoose.connect(DB_CONNECT,
    { useNewURLParser:true }
    )
    .then(()=>{
        console.log("Database Connected successfully");
    })
    .catch((err)=>{
        console.log("DB connect failed",err);
    });

const PORT= 8000;

app.use(express.json());

app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);

app.listen(PORT,()=> console.log(`Server is up and running on ${PORT}`))

 