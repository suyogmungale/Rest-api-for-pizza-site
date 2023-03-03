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

  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const {_id, role} = await JwtService.verify(token)
    const user = {
      _id,
      role
    }
    req.user = user;
    next();

  } catch (error) {
    return next(customeErrorHandler.unAuthorized());
  }
};

export default auth;
