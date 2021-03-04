import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'
// asynchandler let's us detect error in the catch

// a GET request -> takes a (request, response)
// then response.send() sends the data to the client
// then response.json() sends the JSON API data to the client
// GET request to ALL products

// no need for '/get/products' as we're gonna point this to this file itself

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})

    /* throw new Error('Some error') */

    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
