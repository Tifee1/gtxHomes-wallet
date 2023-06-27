const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const dayjs = require('dayjs')

const { BadRequest, NotFoundError } = require('../error')
const SavingsModel = require('../model/savings')

const getAllSavings = async (req, res) => {
  const userId = req.user.userId

  const savings = await SavingsModel.find({ user: userId })

  res.status(StatusCodes.OK).json({ savings })
}
const createSavings = async (req, res) => {
  const userId = req.user.userId
  const { name } = req.body
  if (!name) {
    throw new BadRequest('Please fill all values')
  }
  const savings = await SavingsModel.create({
    name,
    user: userId,
  })
  res.status(StatusCodes.CREATED).json({ savings })
}

const deleteSavings = async (req, res) => {
  const userId = req.user.userId
  const savingsId = req.params.id

  const savings = await SavingsModel.findOneAndDelete({
    _id: jobId,
    user: userId,
  })
  if (!savings) {
    throw new NotFoundError(`No job with ${savingsId}`)
  }
  res.status(StatusCodes.OK).json({ msg: 'Savings Deleted' })
}

module.exports = {
  getAllSavings,
  createSavings,
  deleteSavings,
}
