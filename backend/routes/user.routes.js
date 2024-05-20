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

router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)
router.post('/logout', logoutUser)
router.post('/auth', authUser)

/** -------- ADMIN ROUTES -------- **/
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .patch(protect, admin, updateUser)

module.exports = router
