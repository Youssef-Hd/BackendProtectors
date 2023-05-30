import express from "express";
import commentsControllers from "../controllers/commentsControllers.js";
const router = express.Router();
// import upload from '../middlewares/upload.middleware.js'

router.route("/").post(commentsControllers.postComment);
router.route("/:postId").get(commentsControllers.getCommentsByPostId);
router.route('/:commentId').get(commentsControllers.getCommentsByPostId);
router.route("/").get(commentsControllers.getComments);


export default router;
