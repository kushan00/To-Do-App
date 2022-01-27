import express from 'express';
import apiRoute from './routes/api.js';
import mongoose from 'mongoose';
import {DB_CONNECT} from './utils/constansts.js'

const app = express();

mongoose.connect(DB_CONNECT,
    { useNewURLParser:true },
    (e)=>console.log(e));

const PORT= 8000;

app.use(express.json());

app.use('/api/',apiRoute);

app.listen(PORT,()=> console.log('Server is up and running'))

 