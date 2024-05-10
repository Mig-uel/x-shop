const express = require('express')

// controller
const {
  getProducts,
  getSingleProduct,
} = require('../controllers/product/get.product.controller')

// init router object
const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getSingleProduct)

module.exports = router
