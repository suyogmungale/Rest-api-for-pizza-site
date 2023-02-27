import  express  from "express";
import loginController from "../controllers/logincontrolers.js";
const router = express.Router();
import registerController from "../controllers/registerControllers.js";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

router.post("/api/register", registerController.register);

router.post("/api/login", loginController.login);

router.get("/api/me", auth, userController.me);

export default router;