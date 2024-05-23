const Product = require('../models/product.model')
const asyncHandler = require('../middleware/asyncHandler.middleware')

/** ------ USER ROUTES ------ */
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

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

module.exports = { getProducts, getSingleProduct, createProduct }
