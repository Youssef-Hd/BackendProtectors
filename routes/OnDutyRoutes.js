import express from "express";
import OnDuty from "../controllers/OnDutyControllers.js";
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();

router.route("/getAll").get(OnDuty.getAllPosts);
router.route("/:id").get(OnDuty.getOnDuty);
router.route("/").post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]),OnDuty.postOnDuty);
router.route("/:id").put(OnDuty.updateOnDuty);
router.route("/:id").delete(OnDuty.eraseOnDuty);

export default router;
