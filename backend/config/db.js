const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGODB CONNECTED: ${conn.connection.name}`.green.inverse)
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

module.exports = connectDB
