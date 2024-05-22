const express = require('express')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// routers
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')
const orderRoutes = require('./routes/order.routes')

// middleware
const { notFound, errorHandler } = require('./middleware/error.middleware')

dotenv.config()
const port = process.env.PORT || 5000
connectDB() // start mongodb connection
const app = express() // init express obj

// middleware
app.use(express.json()) // body parser
app.use(express.urlencoded({ extended: true })) // body parser
app.use(cookieParser()) // cookie parser

// main api routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

// custom error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`SERVER STARTED ON PORT: ${port}`.green.inverse)
)
