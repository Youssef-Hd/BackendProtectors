import { Schema } from "mongoose";
import mongoose from "mongoose";

const locationSchema = new Schema({
  location: {
    type: String,
    // required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  images: [{
    public_id:{
      type: String,
    },
    url:{
      type:String,
    }
  }
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
