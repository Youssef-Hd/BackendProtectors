import Reply from "../models/replyModel.js";
import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

//posting a reply to a specific comment
const postReply = async (req, res, next) => {
  try {
    // const { commentId } = req.params;
    const { content, commentId, user } = req.body;

    const reply = await Reply.create({
      content,
      comment: commentId,
      user: user,
    });

    const comment = await Comment.findById(commentId);
    console.log('Comment before modification:', comment )

    comment.replies.push(reply._id);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating comment");
  }
};

 
const getRepliesForComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const replies = await Reply.find({ comment: commentId }).populate('user');
    res.json(replies);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching comments");
  }
};

const getAllReplies = async (req, res) => {
  try {
    // Retrieve all replies from the database
    const replies = await Reply.find().populate('user');

    // Send the retrieved replies as the response
    res.status(200).json(replies);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: "Failed to retrieve replies" });
  }
};



export default {
    postReply,
    getAllReplies,
    getRepliesForComment,
}