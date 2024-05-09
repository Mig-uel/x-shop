const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// router
const productRoutes = require('./routes/product.routes')

// middleware
const { notFound, errorHandler } = require('./middleware/error.middleware')

dotenv.config()
const port = process.env.PORT || 5000
connectDB() // start mongodb connection
const app = express() // init express obj

// main api route
app.use('/api/products', productRoutes)

// custom error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`SERVER STARTED ON PORT: ${port}`.green.inverse)
)
