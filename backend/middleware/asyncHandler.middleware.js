// TODO: Create custom async error handler

const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      // sends error to Express error handler
      next(error)
    }
  }
}

module.exports = asyncHandler
