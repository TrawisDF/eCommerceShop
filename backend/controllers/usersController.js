import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user &get token
//@route POST /api/users/login
//@acces PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user email or password");
  }
});

//@desc Register user
//@route POST /api/users/register
//@acces PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.json(400);
    throw new Error("User already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

//@desc Logout suer & clear cookies
//@route POST /api/users/logout
//@acces Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out successfully" });
});

//@desc gettUserProfile
//@route GET /api/users/profile
//@acces Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); //req.user._id came from authMiddleware

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@acces Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get users by id by Admin
//@route GET /api/users/:id
//@acces Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    throw new Error("User not found");
  }
});

//@desc Get users by Admin
//@route GET /api/users
//@acces Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("Cannot fetch user data");
  }
});

//@desc Delete User
//@route DELETE /api/users
//@acces Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    } else {
      await User.deleteOne({ _id: user._id });
      res.status(201).json({ message: "User delted successfully" });
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user by Admin
//@route PUT /api/users/:id
//@acces Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;
    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      isAdmin: updateUser.isAdmin,
    });
  }
});

export {
  updateUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateUserProfile,
  logoutUser,
  registerUser,
  authUser,
};
