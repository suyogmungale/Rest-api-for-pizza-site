import Joi from "joi";
import User from "../models/user.js";
import customeErrorHandler from "../services/customeErrorHandler.js";
import bcrypt from 'bcrypt';
import JwtService from "../services/JwtService.js";

const loginController =  {
      async login(req, res, next){
        const loginSchema = Joi.object ({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')).required()
        });
console.log(req.body.email);
        const {error} = loginSchema.validate(req.body);

   if (error){
    return next(error)
    }
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(customeErrorHandler.wrongCrendentials());
        }
        console.log(req.body.password, user)
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match){
            return next (customeErrorHandler.wrongCrendentials());
        }

       const access_token = JwtService.sign({ _id: user._id, role:user.role});

       res.json({access_token:access_token});
    } catch (error) {
        return next (error)
    }

  }

   
};

export default loginController;