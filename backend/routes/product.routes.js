const express = require('express')

// controller
const {
  getProducts,
  getSingleProduct,
} = require('../controllers/product/get.product.controller')

// init router object
const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)

module.exports = router
