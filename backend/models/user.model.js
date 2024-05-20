const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

/**
 * Compares the entered password with the user's password.
 * @method
 * @param {string} enteredPassword - The password entered by the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the entered password matches the user's password, otherwise false.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Add a pre-save middleware to the userSchema
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) next()

  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt()

  // Hash the password using bcrypt and the generated salt
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)
