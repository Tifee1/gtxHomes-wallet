const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleWare = async (err, req, res, next) => {
  let customError = {
    statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = ` ${Object.keys(
      err.keyValue
    )} already in use, please try another value`
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if (err.name === 'CastError') {
    customError.msg = `No job with id ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleWare
