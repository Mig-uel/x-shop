const express = require('express')
const products = require('../data/data')

const router = express.Router()

router.get('/', (req, res) => res.json(products))
router.get('/:id', (req, res) => {
  const { id } = req.params
  const product = products.find((p) => p._id === id)

  res.status(200).json(product)
})

module.exports = router
