import  express  from "express";
import loginController from "../controllers/logincontrolers.js";
const router = express.Router();
import registerController from "../controllers/registerControllers.js";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import refreshController from "../controllers/refreshController.js";

router.post("/api/register", registerController.register);

router.post("/api/login", loginController.login);

router.get("/api/me", auth, userController.me);

router.post("/api/refresh", refreshController.refresh);

router.post("/api/logout", auth, loginController.logout);


export default router;