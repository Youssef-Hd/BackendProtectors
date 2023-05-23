import upload from "../middlewares/upload.middleware.js";
import express from "express";
import oneImage from "../controllers/mapImageControllers.js";

// import postLocation from "../../^/untitled/ts-nul-authority/Untitled-1";
const router = express.Router();

router.route("/").post(upload.single('photo'),oneImage.postmapImage);



export default router;
