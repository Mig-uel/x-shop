const express = require('express')

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
router.route('/profile').get(getUserProfile).patch(updateUserProfile)
router.post('/logout', logoutUser)
router.post('/login', authUser)

/** -------- ADMIN ROUTES -------- **/
router.route('/:id').delete(deleteUser).get(getUserById).patch(updateUser)

module.exports = router
