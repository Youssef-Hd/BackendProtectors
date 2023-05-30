import asyncHandler from "express-async-handler";
import Location from "../models/locationModel.js";
import cloudinary from "../middlewares/Cloudinary.js";










// API endpoint for saving location and photo as map data
const postLocation = async (req, res, next) => {
  const { latitude, longitude, location, description, mapImage,user } = req.body;

  try {
    let images = [];

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const uploadedImage = await cloudinary.uploader.upload(
          req.files[i].path
        );
        images.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
    }
    // Create a new Location document
    const locations = new Location({
      latitude,
      longitude,
      location,
      description,
      mapImage,
      images: images,
      user:user,
    });

    // Save the location to the database
    const newLocation = await locations.save();

    res.status(201).json({
      message: "Map data saved successfully",
      data: newLocation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving map data" });
  }
};

// API endpoint for retrieving all map data
// const getLocations = asyncHandler(async (req, res) => {
//   const Locations = await Location.find().populate("mapImage");

//   res.status(200).json({
//     message: "getting all Locations",
//     status: 200,
//     data: Locations,
//   });
// });


const getLocations = asyncHandler(async (req, res) => {
  const Locations = await Location.find()
    .populate('mapImage').populate('user')

  res.status(200).json({
    message: "Getting all Locations",
    status: 200,
    data: Locations,
  });
});








const getLocation = asyncHandler(async (req, res) => {
  const get_location = await Location.findById(req.params.id);
  if (!get_location) {
    return res.status(400).send({ error: "Unable to find ID" });
  }

  res.status(200).json({
    message: "getting a specific location",
    status: 200,
    data: get_location,
  });
});


export default {
  postLocation,
  getLocations,
  getLocation,
};
