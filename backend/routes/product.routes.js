const express = require('express')

// controllers
const {
  getProducts,
  getSingleProduct,
} = require('../controllers/product.controller')

// init router object
const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)

module.exports = router
