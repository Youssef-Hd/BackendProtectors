import express from "express";
import PageControllers from "../controllers/pageControllers.js";
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();




router.route("/getAllPages").get(PageControllers.getAllPages);
router.route("/getPage/:id").get(PageControllers.getPaage);
router
  .route("/postPage")
  .post(upload.single("image"), PageControllers.postPage);
router.route("/updatePage/:id").put(PageControllers.updatePage);
router.route("/deletePage/:id").delete(PageControllers.erasePage);

export default router;
