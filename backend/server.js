// use .js at the end of the file when dealing with backend | ES6 modules
import dotenv from 'dotenv'
import express from 'express'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// dotenv.donfig() comes first!!!
dotenv.config()

connectDB()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running right now...')
})

// All the routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// if users try to access anything that isn't a route, send a 404 NOT FOUND status
// override the default error handler using err first: (err, req, res, next)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
