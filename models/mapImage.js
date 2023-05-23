import { Schema } from "mongoose";
import mongoose from "mongoose";

const mapImageSchema = new Schema({
  
  photo: {
    type: String,
    // required: true,
  },
  
});

const mapImage = mongoose.model("mapImage", mapImageSchema);
export default mapImage;
