const isValidObjectId = require('mongoose').isValidObjectId

const checkObjectId = (req, res, next) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    res.status(404)
    throw new Error(`Invalid ObjectId of: ${id}`)
  }

  next()
}

module.exports = checkObjectId
