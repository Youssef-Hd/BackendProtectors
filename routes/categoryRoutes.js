import express from 'express';
import CategoryController from "../controllers/categoryControllers.js"
const router = express.Router();
import upload from '../middlewares/upload.middleware.js'

router.route("/").get(CategoryController.getAllCategories);
router.route("/:id").get(CategoryController.getCategory);
router.route("/").post(upload.single("image"),CategoryController.postCategory);
router.route("/:id").put(CategoryController.updateCategory);
router.route("/:id").delete(CategoryController.eraseCategory);



export default router;