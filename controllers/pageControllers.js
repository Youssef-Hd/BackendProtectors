import Pages from "../models/PageModel.js";
import asyncHandler from "express-async-handler";

//getting all categories
const getAllPages = asyncHandler(async (req, res) => {
  const all_pages = await Pages.find();

  res.status(200).json({
    message: "getting all Pages",
    status: 200,
    data: all_pages,
  });
});

// getting a specific Category [we can also use findone method ]
// const getPage = asyncHandler(async (req, res) => {

//     const get_page = await Pages.findById(req.params.id);
//     // console.log(get_Category)
//     if (!get_page) {
//         return res.status(400).send({ error: 'Unable to find Pages' })
//     }
//     // const findPage = await Pages.findById(req.params.id)

//     res.status(200).json({
//         message: "getting a specific Pages",
//         status: 200,
//         data: get_page,
//     });
// });

const getPaage = asyncHandler(async (req, res) => {
  const get_Page = await Pages.findById(req.params.id);
  if (!get_Page) {
    return res.status(400).send({ error: "Unable to find ID" });
  }

  res.status(200).json({
    message: "getting a specific Page",
    status: 200,
    data: get_Page,
  });
});

const postPage = asyncHandler(async (req, res) => {
  const { type, title, description } = req.body;

  if (!type || !title || !description) {
    return res.status(400).send({ error: "Please fill all fields" });
  }

  // console.log("Post", postPage);

  const page = await Pages.create({
    type: type,
    title: title,
    description: description,
    image: req.file.path
  });

  res.status(200).json({
    message: "Posted Successfully",
    Status: 200,
    data: page,
  });
});

//Updating an NGO
const updatePage = asyncHandler(async (req, res) => {
  const pageId = req.params.id;
  const update = await Pages.findById(pageId);

  if (!update) {
    return res.status(400).json({ error: "unable to find id" });
  }
  const newUpdate = await Pages.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Updated a specific Page",
    status: 200,
    data: newUpdate,
    image: req.files.map((image) => image.path),
  });
});

//Deleting a program
const erasePage = asyncHandler(async (req, res) => {
  const deletePage = req.params.id;
  const erased = await Pages.findByIdAndDelete(deletePage);

  if (!erased) {
    return res.status(400).json({ message: "Couldn't Delete" });
  }
  const erase = await Pages.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Deleted a specific NGO",
    status: 200,
    data: erase,
  });
});

export default {
  getAllPages,
  getPaage,
  updatePage,
  erasePage,
  postPage,
};
