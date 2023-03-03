import User from "../models/user.js"
import customeErrorHandler from "../services/customeErrorHandler.js";

const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({_id:req.user._id}).select('-password -__v');
    if(!user){
      return next(customeErrorHandler.NotFound());
    }
    res.json(user);

    } catch (error) {
      return next(error);
    }
  }
}

export default userController;
