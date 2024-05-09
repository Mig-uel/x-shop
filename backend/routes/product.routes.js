const express = require('express')
const asyncHandler = require('../middleware/asyncHandler.middleware')

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => res.json(products))
)
router.get('/:id', (req, res) => {
  const { id } = req.params
  const product = products.find((p) => p._id === id)

  res.status(200).json(product)
})

module.exports = router
