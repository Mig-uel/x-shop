const Product = require('../models/product.model')
const asyncHandler = require('../middleware/asyncHandler.middleware')

/** -------- USER ROUTES -------- **/

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.status(200).json(products)
})

/**
 * @desc    Get a single product
 * @route   GET /api/products/:id
 * @access  Public
 */
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)

  if (product) return res.status(200).json(product)

  res.status(404)
  throw new Error('Product not found')
})

module.exports = { getProducts, getSingleProduct }
