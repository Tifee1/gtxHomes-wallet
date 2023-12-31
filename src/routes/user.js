const express = require('express')
const expressRateLimit = require('express-rate-limit')
const { loginUser, registerUser } = require('../controllers/user')

const router = express.Router()

const limit = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    msg: 'Too many requests from this Ip Address, Please try again after 15 minutes',
  },
})

router.post('/login', limit, loginUser)
router.post('/register', limit, registerUser)

module.exports = router
