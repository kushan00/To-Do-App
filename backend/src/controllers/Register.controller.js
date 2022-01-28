import { validationResult } from "express-validator";
import { StatusCode , JWT_TOKEN_SECRET } from "../utils/constansts.js";
import { jsonGenerate } from "../utils/helpers.js";
import bcrypt from 'bcrypt'
import Admin from "../models/Admin.js";
import jwt from 'jsonwebtoken'

const Register = async (req,res) => {


  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()));
  }
  else{
     const{adminID,adminUserName,adminPassword} = req.body;
     const  salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(adminPassword,salt);
    // console.log(hashPassword)
   
    const userExists = await Admin.findOne({adminUserName : adminUserName});

    if(userExists){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Admin already exists",userExists));
    }
     //save to DB
     try{
        const result = await Admin.create({
            adminID:adminID,
            adminUserName:adminUserName,
            adminPassword:hashPassword
        })

        //console.log(adminPassword)

        const token = jwt.sign({userId:result._id},JWT_TOKEN_SECRET);

        res.json(jsonGenerate(StatusCode.SUCCESS,"Registration sucesfull",{userId:result._id,token:token}));
     }catch(error)
        {
            console.log(error);
        }
    }
}

export default Register;
