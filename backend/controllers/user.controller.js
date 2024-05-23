const User = require('../models/user.model')
const asyncHandler = require('../middleware/asyncHandler.middleware')
const generateToken = require('../utils/generateToken.utils')

/** ------ USER ROUTES ------ */
/**
 * @desc    Auth user & set token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body // destructure email and password from request body
  const user = await User.findOne({ email }) // find one that matches the email

  // check if user exists and use instance method to check if password is a match
  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user // destructure _id, name, isAdmin from User

    generateToken(res, _id) // set token cookie

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
  const { name, email, password } = req.body

  // find if a user with email already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    const { _id, name, email, isAdmin } = user // destructure _id, name, isAdmin from User

    generateToken(res, _id) // set token cookie
    res.status(200).json({ _id, name, email, isAdmin })
  } else {
  }
})

/**
 * @desc    Logout user and clear cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged out' })
})

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const { _id, name, email, isAdmin } = req.user // destructure from req.user object

    res.status(200).json({ _id, name, email, isAdmin })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/**
 * @desc    Update user profile
 * @route   PATCH /api/users
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user // destructure _id property from req.user object
  const user = await User.findById(_id) // find a user by _id

  if (user) {
    // update user properties if sent in body of request
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) user.password = req.body.password

    const updatedUser = await user.save()
    const { name, email, isAdmin } = updatedUser

    res.status(200).json({ _id, name, email, isAdmin })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/** ------ ADMIN ROUTES ------ */
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
