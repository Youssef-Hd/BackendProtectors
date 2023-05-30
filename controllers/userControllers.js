import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

//getting all Users
const getAllUsers = asyncHandler(async (req, res) => {
  const all_Users = await User.find();

  res.status(200).json({
    message: "getting all Users",
    status: 200,
    data: all_Users,
  });
});

//register a user
const register = async (req, res) => {
  // console.log(req.body);

  try {
    // Get user input
    const { name, email, password, phoneNumber } = req.body;

    // Validate user input
    if (!(email && password && name && phoneNumber)) {
      // if(!name || !email || !password){
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    var encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      phoneNumber,
      
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    const user_object = {
      name,
      email,
      phoneNumber,
      token,
      _id: user._id,
    };

    // return new user
    res.status(201).json(user_object);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      const user_object = {
        email,
        token,
        _id: user._id,
        role: user.role,
      };

      // user
      return res.status(200).json(user_object);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occurred");
  }
};

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out" });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

export default {
  register,
  login,
  getAllUsers,
  deleteUser,
  logoutUser,
  getMe,
};
