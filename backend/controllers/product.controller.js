const Product = require('../models/product.model')
const asyncHandler = require('../middleware/asyncHandler.middleware')

/** ------ USER ROUTES ------ */
/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2
  const { pageNumber } = req.query
  const page = Number(pageNumber) || 1
  const count = await Product.countDocuments()

  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
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

/** ------ ADMIN ROUTES ------ */
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

/**
 * @desc    Update a product
 * @route   PATCH /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(200).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)

  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

/**
 * @desc Create a new reviews
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { rating, comment } = req.body

  const product = await Product.findById(id)

  if (product) {
    const alreadyReviewed = product.reviews.find((review) =>
      review.user.equals(req.user._id)
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review) // push new review
    product.numReviews = product.reviews.length // set new length of reviews

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length // calculate rating average

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
}
