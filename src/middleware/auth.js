const jwt = require('jsonwebtoken')
const { Unauthenticated } = require('../error')

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Unauthenticated('Unauthorized request')
  }
  try {
    const payload = jwt.verify(
      authHeader.split(' ')[1],
      process.env.JWT_SECRET_KEY
    )

    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new Unauthenticated('Request Token not valid')
  }
}

module.exports = authMiddleWare
