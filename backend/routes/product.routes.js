const express = require('express')
const asyncHandler = require('../middleware/asyncHandler.middleware')
const Product = require('../models/product.model')

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.status(200).json(products)
  })
)
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)

    if (product) return res.status(200).json(product)

    res.status(404).json({ message: 'Product not found' })
  })
)

module.exports = router
