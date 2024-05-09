const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// router
const productRoutes = require('./routes/product.routes')

dotenv.config()
const port = process.env.PORT || 5000
connectDB() // start mongodb connection
const app = express() // init express obj

app.use('/api/products', productRoutes)

app.listen(port, () =>
  console.log(`SERVER STARTED ON PORT: ${port}`.green.inverse)
)
