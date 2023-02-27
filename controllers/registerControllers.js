import { response } from "express";
import Joi from "joi";
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import customeErrorHandler from "../services/customeErrorHandler.js";
import JwtService from "../services/JwtService.js";


const registerController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')).required(),
      repeat_password: Joi.ref('password')
    });

    console.log(req.body);
    const { error } = registerSchema.validate(req.body);

    if(error)
    {return next(error);
    }

    try {
      const exist = await User.exists({email:req.body.email});

    if(exist) {
      return next(customeErrorHandler.alreadyExist('this email is already taken'));
    }

    } catch (error) {
      return next(err);
    }
   
    
    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { name, email, password} = req.body;

    const user = new User({
      name,
      email,
      password:hashedPassword

    })
   
    
    let access_token;
    try {
      const result = await user.save();
      //console.log(result);
      //token
       access_token = JwtService.sign({ _id: result._id, role:result.role});



    } catch (error) {
      return next(error);
    }

    res.json({ access_token:access_token });
  }
};                                   

export default registerController;
