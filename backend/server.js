const express = require('express')
const products = require('./data/products')

const app = express()

// a GET request -> takes a (request, response)
// then response.send() sends the data to the client
// then response.json() sends the JSON API data to the client
app.get('/', (req, res) => {
  res.send('API is running...')
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

app.listen(5000, console.log('Server running on port 5000'))
