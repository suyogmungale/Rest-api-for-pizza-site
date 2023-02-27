import customeErrorHandler from "../services/customeErrorHandler.js";
import Joi from "joi";
import User from "../models/user.js";
import JwtService from "../services/JwtService.js";

const auth = async(req, res, next) => {
  console.log(req.headers);
  let authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return next(customeErrorHandler.unAuthorized());
  }

  let token0 = authHeader.split('');
  let token1  = token0[1];
  req.token = token1;
  next();

  
  console.log(token1);

  try {
    const {_id, role} = await JwtService.verify(token)
    req.user = {};
    req.user._id = _id;
    req.user.role = role;

    next();

  } catch (error) {
    return next(customeErrorHandler.unAuthorized());
  }
};

export default auth;
