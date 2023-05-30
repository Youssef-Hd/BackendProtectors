import upload from "../middlewares/upload.middleware.js";
import express from "express";
import Location from "../controllers/locationControllers.js";

const router = express.Router();

router.route("/").get(Location.getLocations);
router.route("/getlocation/:id").get(Location.getLocation);
router.route("/").post(upload.array('images'),Location.postLocation);
// router.route("/mapImage").post(upload.single('mapImage'),Location.mapImagepost);



export default router;


