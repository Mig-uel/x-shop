/** Initialize Express Router */
const router = require('express').Router()

/** Middleware */
const { protect, admin } = require('../middleware/auth.middleware')

/** User Controllers */
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

/** ------ USER ROUTES ------ */
router.route('/').post(registerUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)
router.post('/logout', logoutUser)
router.post('/auth', authUser)

/** ------ ADMIN ROUTES ------ */
router.route('/').get(protect, admin, getAllUsers)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .patch(protect, admin, updateUser)

module.exports = router
