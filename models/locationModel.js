import { Schema } from "mongoose";
import mongoose from "mongoose";

const locationSchema = new Schema({
  description: {
    type: String,
  },
  location: {
    type: String,
    // required: true,
  },
  latitude: {
    type: Number,
    // required: true,
  },
  longitude: {
    type: Number,
    // required: true,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  mapImage: {
    type: Schema.Types.ObjectId,
    ref: "mapImage",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
