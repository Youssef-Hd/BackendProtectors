import { Schema } from "mongoose";
import mongoose from "mongoose";

const postsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    default: "",
  },
  images: [{ type: String }],
  
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },

  ],
});

const Posts = mongoose.model("posts", postsSchema);
export default Posts;
