import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      wallet: user.wallet,
      token: generateToken(user._id),
    });
  } else {
    res.send(401)
  //   .json({
  //     errorMessage: '401'
  //  });
    throw new Error("Invalid Credentials!");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    wallet: ''
  });

  if (user) {
    res.status(201 || 200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      wallet: user.wallet,
      token: generateToken(user._id),
    });
  }else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    user.wallet = req.body.wallet || user.wallet;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      wallet: updatedUser.wallet,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getUser = asyncHandler(async (req, res) => {
  try{ 
    const users = await User.find({});
    // console.log(users)
    res.json(users)
  } catch (error) {
    console.log('UserController get Users Error - ', error)
    res.status(500).json({
      errorMessage: 'error 500, please try again!',
      error
    })
 }  
});

export { authUser, updateUserProfile, registerUser, getUser };
