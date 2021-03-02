// use .js at the end of the file when dealing with backend | ES6 modules
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'
import compression from 'compression'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// totaly optional
import colors from 'colors'

// dotenv.donfig() comes first!!!
dotenv.config()

connectDB()
const app = express()

app.get('/', (req, res) => {
  res.send('API is running right now...')
})

// everything that goes to /api/products is linked to productRouter
app.use('/api/products', productRouter)

// if users try to access anything that isn't a route, send a 404 NOT FOUND status
// override the default error handler using err first: (err, req, res, next)
app.use(notFound)
app.use(errorHandler)

app.use(compression())

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
