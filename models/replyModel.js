import { Schema } from "mongoose";
import mongoose from "mongoose";

const replySchema = new Schema({
  content: {
    type: String,
    // required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});

// module.exports = mongoose.model("Reply", replySchema);
const Reply = mongoose.model("Reply", replySchema);
export default Reply;
