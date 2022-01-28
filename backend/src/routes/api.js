import express from 'express'
import Login from '../controllers/Login.controller.js';
import Register from "../controllers/Register.controller.js"
import { createUser } from '../controllers/User.controller.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';

const apiRoute=express.Router()
export const apiProtected = express.Router();

apiRoute.post('/admin/register' , RegisterSchema,Register)
apiRoute.post('/admin/login',LoginSchema ,Login)

//protected apis

apiProtected.post("/user/createUser",createUser);

export default apiRoute;
