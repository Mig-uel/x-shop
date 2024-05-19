const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler.middleware')
const User = require('../models/user.model')

/** ------ PROTECT ROUTES ------ */

const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.jwt // access/read the JWT cookie

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // decode token

      // assign to req object an object 'user' and value of the User object from db
      req.user = await User.findById(decodedToken.userId).select('-password')
      next()
    } catch (e) {
      res.status(401)
      throw new Error('Not authorized, token failed.')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token.')
  }
})

/** ------ PROTECT ADMIN ROUTES ------ */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin.')
  }
}

module.exports = { protect, admin }
