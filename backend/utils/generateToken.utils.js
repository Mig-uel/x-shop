const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  }) // create token

  /** ---- SET JWT AS HTTP-ONLY COOKIE */
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true && process.env.NODE_ENV === 'production', // set to true only in production
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
}

module.exports = generateToken
