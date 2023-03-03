import User from "../models/user.js";
import customeErrorHandler from "../services/customeErrorHandler.js";

const admin = async(req, res, next) => {
    try {
        const user = await User.findOne({_id:req.user._id});

        if(user.role === 'admin'){
            next()
        } else {
            return next(customeErrorHandler.unAuthorized());
        }
    } catch (error) {
        return next(customeErrorHandler.serverError());
    }

};

export default admin;