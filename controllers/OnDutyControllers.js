import asyncHandler from "express-async-handler";
import onduty from "../models/OnDutyModel.js";

//getting all OnDuty
const getAllOnDuty = asyncHandler(async (req, res) => {
  const all_OnDuty = await onduty.find();

  res.status(200).json({
    message: "getting all OnDuty",
    status: 200,
    data: all_OnDuty,
  });
});

//get on Duty
const getOnDuty = asyncHandler(async (req, res) => {
  const get_OnDuty = await onduty.findById(req.params.id);
  if (!get_OnDuty) {
    return res.status(400).send({ error: "Unable to find ID" });
  }

  res.status(200).json({
    message: "getting a specific Page",
    status: 200,
    data: get_OnDuty,
  });
});

const postOnDuty = asyncHandler(async (req, res) => {
  const { location, description } = req.body;
  const image = req.files.image;
  const basePath = `${req.protocol}://${req.get("host")}/images`;
  const fileName = image[0].filename;

  if (!location || !description) {
    return res.status(400).send({ error: "Please fill all fields" });
  }

  // console.log("Post", postPage);

  const ondutyy = await onduty.create({
    location: location,
    description: description,
    image: `${basePath}/${fileName}`,
  });

  res.status(200).json({
    message: "Posted Successfully",
    Status: 200,
    data: ondutyy,
  });
});

//Updating OnDuty
const updateOnDuty = asyncHandler(async (req, res) => {
  const pageId = req.params.id;
  const update = await onduty.findById(pageId);
  const image = req.body

  if (!update) {
    return res.status(400).json({ error: "unable to find id" });
  }
  const newUpdate = await onduty.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Updated a specific Page",
    status: 200,
    data: newUpdate,
    image: image,
  });
});

//Deleting onDuty
const eraseOnDuty = asyncHandler(async (req, res) => {
  const deleteOnDuty = req.params.id;
  const erased = await onduty.findByIdAndDelete(deleteOnDuty);

  if (!erased) {
    return res.status(400).json({ message: "Couldn't Delete" });
  }
  const erase = await onduty.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Deleted a specific NGO",
    status: 200,
    data: erase,
  });
});

export default {
  eraseOnDuty,
  updateOnDuty,
  postOnDuty,
  getAllOnDuty,
  getOnDuty,
};
