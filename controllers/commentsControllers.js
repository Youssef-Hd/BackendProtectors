import Comment from "../models/commentModel.js";
import asyncHandler from "express-async-handler";
import Post from "../models/locationModel.js";

const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId }).populate('user');
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching comments");
  }
};

const postComment = async (req, res, next) => {
  try {
    const { postId, content, user} = req.body;

    // Create the comment
    const comment = await Comment.create({
      content,
      post: postId,
      user: user,
    });

    const post = await Post.findById(postId);
    console.log("Post before modification:", post);

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating comment");
  }
};

const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("replies");
  res.status(200).json({
    message: "getting all comments",
    status: 200,
    data: comments,
  });
});



export default {
  postComment,
  getComments,
  getCommentsByPostId,
};
