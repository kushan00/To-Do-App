import { validationResult } from "express-validator";
import { StatusCode , JWT_TOKEN_SECRET } from "../utils/constansts.js";
import { jsonGenerate } from "../utils/helpers.js";
import bcrypt from 'bcrypt'
import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const Register = async (req,res) => {


  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()));
  }
  else{
     const{name,username,password,email} = req.body;
     const  salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password,salt);

   
    const userExists = await User.findOne({$or:[{
        email:email
    } , {
        username : username
    }]});

    if(userExists){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"User or Email already exists",data));
    }
     //save to DB
     try{
        const result = await User.create({
            name:name,
            email:email,
            username:username,
            password:hashPassword
        })

        const token = jwt.sign({userId:result._id},JWT_TOKEN_SECRET);

        res.json(jsonGenerate(StatusCode.SUCCESS,"Registration sucesfull",{userId:result._id,token:token}));
     }catch(error)
        {
            console.log(error);
        }
    }
}

export default Register;
