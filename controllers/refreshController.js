import Joi from "joi";
import { REFRESH_SECRET } from "../config/index.js";
import refreshToken from "../models/refreshToken.js";
import customeErrorHandler from "../services/customeErrorHandler.js";
import JwtService from "../services/JwtService.js";
import User from "../models/user.js";

const refreshController = {
        async refresh(req, res, next){
            const refreshSchema = Joi.object ({
                refresh_token: Joi.string().required(),
                
            });
   // console.log(req.body.email);
            const {error} = refreshSchema.validate(req.body);
    
       if (error){
        return next(error)
        }

        //database
        let refreshtoken
        try {
            refreshtoken = await refreshToken.findOne({token:req.body.refresh_token});
            
            if(!refreshtoken){
               return next(customeErrorHandler.unAuthorized('invalid refresh token'));
            }
            
            let userId;
            try {
                const { _id } = await JwtService.verify(refreshtoken.token, REFRESH_SECRET);
                userId = _id;

            } catch (error) {
                return next(customeErrorHandler.unAuthorized('invalid refresh token'));
            }

            const user = User.findOne({_id:userId});
            if(!user){
                return next(customeErrorHandler.unAuthorized('no user found'));
            }

            //token
            const access_token = JwtService.sign({ _id: user._id, role:user.role});

            const refresh_token = JwtService.sign({ _id: user._id, role:user.role}, '1y', REFRESH_SECRET)
     
            await refreshToken.create({token:refresh_token})
     
            res.json({access_token:access_token, refresh_token});

        } catch (error) {
         return next(new Error('something went wrong'+ error.message))
        }
    }
};

export default refreshController
