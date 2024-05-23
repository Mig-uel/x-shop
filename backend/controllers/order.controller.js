const Order = require('../models/order.model')
const Product = require('../models/product.model')
const asyncHandler = require('../middleware/asyncHandler.middleware')

/** ------ USER ROUTES ------ */
/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length == 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      user: _id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

/**
 * @desc    Get users orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user

  const orders = await Order.find({ user: _id })
  res.status(200).json(orders)
})

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const order = await Order.findById(id).populate('user', 'name email')

  if (order) res.status(200).json(order)
  else {
    res.status(404)
    throw new Error('Order not found')
  }
})

/**
 * @desc    Update order to paid
 * @route   PATCH /api/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    for (let i in updatedOrder.orderItems) {
      const item = updatedOrder.orderItems[i]
      const product = await Product.findById(item.product)

      product.countInStock -= item.qty

      product.save()
    }
    res.status(200).json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

/** ------ ADMIN ROUTES ------ */
/**
 * @desc    Update order to delivered
 * @route   PATCH /api/orders/:id/deliver
 * @access  Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered')
})

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  res.status(200).json(orders)
})

module.exports = {
  addOrderItems,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
}
