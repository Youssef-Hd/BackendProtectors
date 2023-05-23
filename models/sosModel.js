import mongoose from "mongoose";
import { Schema } from "mongoose";

const SosSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  },
});

const Sos = mongoose.model("Sos", SosSchema);

export default Sos;
