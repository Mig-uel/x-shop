/** Initialize Express Router */
const router = require('express').Router()

/** Middleware */
const checkObjectId = require('../middleware/checkObjectId.middleware')
const { protect, admin } = require('../middleware/auth.middleware')

/** Product Controllers */
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/product.controller')

/** USER ROUTES */
router.route('/').get(getProducts)
router.route('/top').get(getTopProducts)
router.route('/:id').get(checkObjectId, getSingleProduct)
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)

/** ADMIN ROUTES */
router.route('/').post(protect, admin, createProduct)
router
  .route('/:id')
  .patch(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)

module.exports = router
