const express = require('express')
const { createSavings, getAllSavings } = require('../controllers/savings')

const router = express.Router()

router.route('/').get(getAllSavings).post(createSavings)

module.exports = router
