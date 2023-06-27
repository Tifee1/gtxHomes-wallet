const { Schema, model } = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a name'],
    maxLength: [50, 'Name to long'],
    minLength: [3, 'Name to short'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [6, 'Password too short'],
  },
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  if (!process.env.JWT_SECRET_KEY || !process.env.JWT_LIFETIME)
    throw new Error(`No env values provided in development or production`)
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_LIFETIME }
  )
}

// compare password
UserSchema.methods.comparePassword = async function (password2) {
  return await bcryptjs.compare(password2, this.password)
}

module.exports = model('Users', UserSchema)
