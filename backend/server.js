const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// routers
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')
const orderRoutes = require('./routes/order.routes')
const uploadRoutes = require('./routes/upload.routes')

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
app.use('/api/uploads', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  // any route that is not api will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else app.get('/', (req, res) => res.send('API is running...'))

// custom error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`SERVER STARTED ON PORT: ${port}`.green.inverse)
)
