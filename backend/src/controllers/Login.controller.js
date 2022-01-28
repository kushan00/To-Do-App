import { validationResult } from "express-validator";
import { StatusCode , JWT_TOKEN_SECRET } from "../utils/constansts.js";
import { jsonGenerate } from "../utils/helpers.js";
import bcrypt from 'bcrypt'
import Admin from "../models/Admin.js";
import jwt from 'jsonwebtoken'

const Login = async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()));
    }
    else
    {
        const {adminUserName ,adminPassword}=req.body;
        const admin = await Admin.findOne({adminUserName:adminUserName});

        if(!admin)
        {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"user name or password incorrect",admin));
        }
        
        const verified = bcrypt.compareSync(adminPassword,admin.adminPassword);

        if(!verified)
        {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"user name or password incorrect",admin));
        }

        const token = jwt.sign({userId:admin._id},JWT_TOKEN_SECRET);
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Login successfull",{userId:admin._id,token:token})) ; 
    }
}
 
export default Login;
