const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const products = require('./data/data')

dotenv.config()
const port = process.env.PORT || 5000
connectDB() // MongoDB connection
const app = express()

app.get('/api/products', (req, res) => res.json(products))
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find((p) => p._id === id)

  res.status(200).json(product)
})

app.listen(port, () => console.log(`SERVER STARTED ON PORT: ${port}`.blue))
