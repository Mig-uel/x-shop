const jwt = require('jsonwebtoken')
const asyncHandler = require('../middleware/asyncHandler.middleware')
const User = require('../models/user.model')

/** -------- USER ROUTES -------- **/

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body // destructure email and password from request body
  const user = await User.findOne({ email }) // find one that matches the email

  // check if user exists and use instance method to check if password is a match
  if (user && (await user.matchPassword(password))) {
    const { _id, name, isAdmin } = user // destructure _id, name, isAdmin from User
    const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    }) // create token

    return res.status(201).json({ _id, name, email, isAdmin })
  } else {
    res.status(401)
    throw new Error('Invalid email or password!')
  }
})

/**
 * @desc    Register user
 * @route   POST /api/users
 * @access  Public
 */

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'register user route' })
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
  const { id } = req.params

  res.status(200).json({ admin: 'get user by id route', id })
})

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  res.status(200).json({ admin: 'delete user route', id })
})

/**
 * @desc    Update user
 * @route   PATCH /api/users/:id
 * @access  Private/Admin
 */

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  res.status(200).json({ admin: 'update user route', id })
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
