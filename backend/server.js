// use .js at the end of the file when dealing with backend | ES6 modules
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import products from './data/products.js'
// totaly optional
import colors from 'colors'

// dotenv.donfig() comes first!!!
dotenv.config()

connectDB()
const app = express()

// a GET request -> takes a (request, response)
// then response.send() sends the data to the client
// then response.json() sends the JSON API data to the client
app.get('/', (req, res) => {
  res.send('API is running right now...')
})

// GET request to ALL products
app.get('/api/products', (req, res) => {
  res.json(products)
})

// GET request to ONE single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
