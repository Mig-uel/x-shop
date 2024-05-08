// npm packages
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')

// data
const users = require('./data/users')
const products = require('./data/data')

// mongoose model
const User = require('./models/user.model')
const Product = require('./models/product.model')
const Order = require('./models/order.model')

// mongodb connection
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const importData = async () => {
  try {
    // drop all Orders, Products, and Users from DB
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // insert users and returns all users inserted
    const createdUsers = await User.insertMany(users)
    // retrieve first user ID from createdUsers
    const adminUser = createdUsers[0]._id

    // array from products + inserts the adminUser
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }))

    await Product.insertMany(sampleProducts)
    console.log('Data Imported!'.green.inverse)

    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // drop all Orders, Products, and Users from DB
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('DATA DESTROYED!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') destroyData()
else importData()
