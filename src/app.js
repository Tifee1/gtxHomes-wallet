const express = require('express')
const path = require('path')
require('express-async-errors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const cors = require('cors')
const xssClean = require('xss-clean')

const errorHandlerMiddleWare = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const userRouter = require('./routes/user')
const jobsRouter = require('./routes/savings')
const connectDB = require('./db/connectDB')
const authMiddleWare = require('./middleware/auth')

dotenv.config()

// Boot express
const app = express()
const port = process.env.PORT || 4240

app.set('trust proxy', 1)

app.use(express.static(path.resolve(__dirname, '../client/dist')))

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xssClean())

app.use('/api/v1/auth', userRouter)
app.use('/api/v1/savings', authMiddleWare, jobsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})

app.use(errorHandlerMiddleWare)
app.use(notFound)

const start = async () => {
  if (!process.env.MONGODB_URI) throw new Error(`No mongodb uri provided`)
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () => console.log(`Server is listening on port ${port}!`))
  } catch (error) {
    console.log(error)
  }
}

start()

// Start server
