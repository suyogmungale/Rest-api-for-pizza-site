import  express  from "express";
import loginController from "../controllers/logincontrolers.js";
const router = express.Router();
import registerController from "../controllers/registerControllers.js";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import refreshController from "../controllers/refreshController.js";
import productController from "../controllers/productControlers.js";
import admin from "../middlewares/admin.js";


router.post("/api/register", registerController.register);

router.post("/api/login", loginController.login);

router.get("/api/me", auth, userController.me);

router.post("/api/refresh", refreshController.refresh);

router.post("/api/logout", auth, loginController.logout);

router.post("/api/products",  productController.store); //[auth,admin] use here

router.put("/api/products/:id",  productController.update);//[auth,admin] use here

router.delete("/api/products/:id",  productController.distroy);


export default router;