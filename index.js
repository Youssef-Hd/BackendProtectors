import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import UserRoute from "./routes/userRoutes.js";
import CategoryRoute from "./routes/categoryRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import OnDutyRoutes from './routes/OnDutyRoutes.js'
import LocationRoutes from './routes/locationRoutes.js'
import MapRoutes from './routes/mapImageRoutes.js'
import cors from "cors";

dotenv.config();
await db();
const app = new express();
app.use(cors()); 

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use('/images', express.static('images'));

app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/category/:id", CategoryRoute);
app.use("/api/ngo", ngoRoutes);
app.use("/api/ngo/:id", ngoRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/page/:id", pageRoutes);
app.use("/api/onduty", OnDutyRoutes);
app.use("/api/location", LocationRoutes);
app.use("/api/mapImage", MapRoutes);
app.use("/api/onduty/:id", OnDutyRoutes);


app.listen(port, () => console.log(`API IS RUNING ON PORT: ${port}`));
