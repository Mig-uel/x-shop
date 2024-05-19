const express = require('express')

// middleware
const { protect, admin } = require('../middleware/auth.middleware')

// controllers
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller')

// init router obj
const router = express.Router()

router.route('/').post(registerUser).get(getAllUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)
router.post('/logout', logoutUser)
router.post('/login', authUser)

/** -------- ADMIN ROUTES -------- **/
router.route('/:id').delete(deleteUser).get(getUserById).patch(updateUser)

module.exports = router
