const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)

  next(error)
}

const errorHandler = (error, req, res, next) => {
  // overwrite statusCode if '200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  // destructure message thrown from error object
  let { message } = error

  res.status(statusCode).json({
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  })
}

module.exports = { notFound, errorHandler }
