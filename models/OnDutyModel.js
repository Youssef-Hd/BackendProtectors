import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const OnDutySchema = new Schema ({
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "",
  },
  images: [{ type: String }],
});


const onduty = mongoose.model("OnDuty", OnDutySchema);
export default onduty;
