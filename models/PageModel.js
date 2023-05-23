import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const pagesSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "",
      },
});

const Pages = mongoose.model('Pages', pagesSchema);

export default Pages;