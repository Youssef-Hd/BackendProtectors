import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();


const ATLAS_URL = process.env.ATLAS_URL;

const db = async () => {
try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(ATLAS_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    });

console.log('MongoDB Is Connected.' );
  }  catch (err) {
        console.error(err.message);
        process.exit(1);
    }};

export default db;