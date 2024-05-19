const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// routers
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')

// middleware
const { notFound, errorHandler } = require('./middleware/error.middleware')

dotenv.config()
const port = process.env.PORT || 5000
connectDB() // start mongodb connection
const app = express() // init express obj

// middleware
app.use(express.json()) // body parser
app.use(express.urlencoded()) // body parser

// main api routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// custom error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`SERVER STARTED ON PORT: ${port}`.green.inverse)
)
