// import OnDuty from "../controllers/OnDutyControllers.js";
import upload from "../middlewares/upload.middleware.js";
import express from "express";
import Location from "../controllers/locationControllers.js";

// import postLocation from "../../^/untitled/ts-nul-authority/Untitled-1";
const router = express.Router();

router.route("/").get(Location.getLocations);
router.route("/").post(upload.single('photo'),upload.array('images'),Location.postLocation);



export default router;


