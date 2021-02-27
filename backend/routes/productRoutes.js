import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'

// a GET request -> takes a (request, response)
// then response.send() sends the data to the client
// then response.json() sends the JSON API data to the client
// GET request to ALL products

// no need for '/get/products' as we're gonna point this to this file itself

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})

    res.json(products)
  } catch (error) {
    console.error(`${error}`.red.inverse)
  }
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    res.json(product)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    res.status(404).json({ message: `product id ${req.params.id} not found` })
  }
})

export default router
