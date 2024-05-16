const asyncHandler = require('../middleware/asyncHandler.middleware')
const User = require('../models/user.model')

/** -------- USER ROUTES -------- **/

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */

const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'auth user route' })
})

/**
 * @desc    Register user
 * @route   POST /api/users
 * @access  Public
 */

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'logout route' })
})

/**
 * @desc    Logout user and clear cookie
 * @route   POST /api/users/logout
 * @access  Private
 */

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'logout user route' })
})

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get user profile route' })
})

/**
 * @desc    Update user profile
 * @route   PATCH /api/users
 * @access  Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'update user profile route' })
})

/** -------- ADMIN ROUTES -------- **/

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */

const getAllUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ admin: 'get users route' })
})

/**
 * @desc    Get user by ID
 * @route   GET /api/users
 * @access  Private/Admin
 */

const getUserById = asyncHandler(async (req, res) => {
  res.status(200).json({ admin: 'get user by id route' })
})

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ admin: 'delete user route' })
})

/**
 * @desc    Update user
 * @route   PATCH /api/users/:id
 * @access  Private/Admin
 */

const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ admin: 'update user route' })
})

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
}
