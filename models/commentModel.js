import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
  },
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
