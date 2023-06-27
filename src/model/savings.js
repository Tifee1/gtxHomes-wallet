const { Schema, model, Types } = require('mongoose')

const SavingsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide Savings name'],
      maxLength: [50, 'savings name too long'],
    },
    amount: {
      type: Number,
      default: 0,
    },
    user: {
      type: Types.ObjectId,
      required: [true, 'Please provide User'],
      ref: 'Users',
    },
  },
  { timestamps: true }
)

module.exports = model('Savings', SavingsSchema)
