import express from "express";
import UserController from "../controllers/userControllers.js";
import verifyToken from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);
router.route("/logout").post(UserController.logoutUser);
router.route("/getAllUsers").get(UserController.getAllUsers);
router.route("/getuser/:id").get(verifyToken, UserController.getMe);
router.route("/deleteUser/:id").get(verifyToken, UserController.deleteUser);


export default router;