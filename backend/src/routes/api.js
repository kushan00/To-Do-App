import express from 'express'
import Login from '../controllers/Login.controller.js';
import Register from "../controllers/Register.controller.js"
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';

const apiRoute=express.Router()

apiRoute.post('/admin/register' , RegisterSchema,Register)
apiRoute.post('/admin/login',LoginSchema ,Login)


export default apiRoute;
