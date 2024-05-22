/** Initialize Express Router */
const router = require('express').Router()

/** Middleware */
const { protect, admin } = require('../middleware/auth.middleware')

/** Order Controllers */
const {
  addOrderItems,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} = require('../controllers/order.controller')

/** User Routes */
router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id/pay').patch(protect, updateOrderToPaid)

/** Admin Routes */
router.route('/').get(protect, admin, getAllOrders)
router.route('/:id').get(protect, admin, getOrderById)
router.route('/:id/deliver').patch(protect, admin, updateOrderToDelivered)

module.exports = router
