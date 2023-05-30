import asyncHandler from "express-async-handler";
import cloudinary from "../middlewares/Cloudinary.js";
import mapImage from "../models/mapImage.js";


// API endpoint for saving location and photo as map data
const postmapImage = async (req, res, next) => {
  try {
    let photo = req.file.path;
    const onePhoto = await cloudinary.uploader.upload(photo); // upload the image to cloudinary

    // Create a new map image
    const map = new mapImage({
      photo: onePhoto.secure_url,
    });

    // Save the location to the database
    const newmapImage = await map.save();

    res.status(201).json({
      message: "Map data saved successfully",
      data: newmapImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving map data" });
  }
};
export default {
  postmapImage,
};
