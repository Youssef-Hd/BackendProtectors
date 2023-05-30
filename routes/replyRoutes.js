import express from "express";
import replyControllers from '../controllers/replyControllers.js'
const router = express.Router();


router.route('/replies').get(replyControllers.getAllReplies);
router.route('/:commentId/replies').get(replyControllers.getRepliesForComment)
router.route("/postreply").post(replyControllers.postReply);

export default router;
