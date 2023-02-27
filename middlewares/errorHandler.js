//import { DEBUG_MODE } from "../config/index.js";
import pkg from 'joi';
import customeErrorHandler from '../services/customeErrorHandler.js';
const { ValidationError } = pkg;


const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  let data = {
    message: "Internal server error",
    origenalError: err.message
  }

  if(err instanceof ValidationError){
    statusCode = 422;
    data = {
      message: err.message
    }
  }

  if(err instanceof customeErrorHandler){
    statusCode = err.status;
    data ={
      message: err.massage
    }
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
