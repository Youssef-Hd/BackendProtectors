import Reply from "../models/replyModel.js";
import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

//posting a reply to a specific comment
const postReply = async (req, res, next) => {
  try {
    // const { commentId } = req.params;
    const { content, commentId } = req.body;

    const reply = await Reply.create({
      content,
      comment: commentId,
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

    // if (!comment) {
    //   return res.status(404).json({ error: "Comment not found" });
    // }

    // const newReply = new Reply({
    //   content,
    //   comment: comment._id,
    // });

//     await newReply.save();

//     comment.replies.push(newReply);
//     await comment.save();

//     res.status(201).json(newReply);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create reply" });
//   }
// };

// Get replies for a comment
// const getRepliesForComment = asyncHandler(async (req, res) => {
//   const commentId = req.params.commentId;

//   const replies = await Reply.find({ comment: commentId }).populate("Comment");

//   res.status(200).json(replies);
// });
const getRepliesForComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const replies = await Reply.find({ comment: commentId });
    res.json(replies);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching comments");
  }
};

const getAllReplies = async (req, res) => {
  try {
    // Retrieve all replies from the database
    const replies = await Reply.find();

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