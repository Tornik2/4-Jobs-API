const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'something went wrong bro'
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.code && err.code === 11000) {
    customError.statusCode = 400
    customError.msg = `${err.keyValue.email} is already registered`
  }
  if(err.name === "ValidationError") {
    customError.msg = Object.values(err.errors).map(item => item.message).join(', ')
    customError.statusCode = 400
  }
  if(err.name === "CastError") {
    customError.msg = `item with the id of ${err.value} is not found`
    customError.statusCode = 404
  }
  // return res.status(customError.statusCode).json({ err } )

  return res.status(customError.statusCode).json( { msg: customError.msg } )
}

module.exports = errorHandlerMiddleware
