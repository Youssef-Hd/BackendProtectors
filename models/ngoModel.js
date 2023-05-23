import { Schema } from "mongoose";
import mongoose from "mongoose";

const ngoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

});

const Ngo = mongoose.model("Ngo", ngoSchema);
export default Ngo;
