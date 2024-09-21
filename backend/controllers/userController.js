import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @desc    Authenticate the User & GET Token
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  res.send("Login user");
});

/**
 * @desc    Register a New User
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

/**
 * @desc    Logout User & Clear Cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

/**
 * @desc    GET User Profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("getUserProfile");
});

/**
 * @desc    Update User Profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("updateUserProfile");
});

/**
 * @desc    GET All Users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  res.send("getUsers");
});

/**
 * @desc    GET Users By ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUsersByID = asyncHandler(async (req, res) => {
  res.send("getUsersByID");
});

/**
 * @desc    Delete User
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  res.send("deleteUser");
});

/**
 * @desc    Update User
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  res.send("updateUser");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersByID,
  deleteUser,
  updateUser,
};