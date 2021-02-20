const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')

dotenv.config()
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
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
