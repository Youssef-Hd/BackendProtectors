import Ngo from "../models/ngoModel.js";
import asyncHandler from "express-async-handler";

//getting all categories
const getAllNgos = asyncHandler(async (req, res) => {
  const all_ngos = await Ngo.find();

  res.status(200).json({
    message: "getting all Ngo's",
    status: 200,
    data: all_ngos,
  });
});

// getting a specific Category [we can also use findone method ]
const getNgo = asyncHandler(async (req, res) => {
  const get_ngo = await Ngo.findById(req.params.id);
  // console.log(get_Category)
  if (!get_ngo) {
    return res.status(400).send({ error: "Unable to find NGO" });
  }
  res.status(200).json({
    message: "getting a specific NGO",
    status: 200,
    data: get_ngo,
  });
});

const postNgo = asyncHandler(async (req, res) => {
  const { name, phoneNumber, address } = req.body;

  if (!name || !phoneNumber || !address) {
    return res.status(400).send({ error: "Please fill all fields" });
  }

  const newNgo = await Ngo.create({
    name: name,
    phoneNumber: phoneNumber,
    address: address,
  });

  res.status(200).json({
    message: "Posted Successfully",
    Status: 200,
    data: newNgo,
  });
});

//Updating an NGO
const updateNgo = asyncHandler(async (req, res) => {
  const ngoId = req.params.id;
  const update = await Ngo.findById(ngoId);

  if (!update) {
    return res.status(400).json({ error: "unable to find id" });
  }
  const newUpdate = await Ngo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Updated a specific NGO",
    status: 200,
    data: newUpdate,
  });
});

//Deleting a program
const eraseNgo = asyncHandler(async (req, res) => {
  const deleteNgo = req.params.id;
  const erased = await Ngo.findByIdAndDelete(deleteNgo);

  if (!erased) {
    return res.status(400).json({ message: "Couldn't Delete" });
  }
  const erase = await Ngo.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Deleted a specific NGO",
    status: 200,
    data: erase,
  });
});

export default {
  getAllNgos,
  getNgo,
  updateNgo,
  eraseNgo,
  postNgo,
};
