/** Initialize Express Router */
const router = require('express').Router()

/** Product Controllers */
const {
  getProducts,
  getSingleProduct,
} = require('../controllers/product.controller')

router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)

module.exports = router
