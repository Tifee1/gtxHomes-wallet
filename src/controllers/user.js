const { StatusCodes } = require('http-status-codes')

const { BadRequest, NotFoundError, Unauthenticated } = require('../error')
const UserModel = require('../model/user')

const registerUser = async (req, res) => {
  const { email, name, password } = req.body

  const user = await UserModel.create({ email, name, password })
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequest('Please provide email and password')
  }
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new Unauthenticated('User not found')
  }
  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    throw new Unauthenticated('Password not correct')
  }
  const token = user.createJWT()

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  })
}

module.exports = { loginUser, registerUser }
