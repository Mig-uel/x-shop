/** Initialize Express Router */
const router = require('express').Router()

/** Middleware */
const { protect, admin } = require('../middleware/auth.middleware')

/** Product Controllers */
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller')

/** USER ROUTES */
router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)

/** ADMIN ROUTES */
router.route('/').post(protect, admin, createProduct)
router
  .route('/:id')
  .patch(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

module.exports = router
