import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const products = await Product.find({ ...keyword })

  res.json(products)
})

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Produto removido' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Nome do produto',
    price: 0,
    user: req.user._id,
    image: 'URL do produto',
    brand: 'Marca',
    category: 'categoria',
    countInStock: 0,
    numReviews: 0,
    description: 'descrição',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    ;(product.name = name),
      (product.price = price),
      (product.image = image),
      (product.brand = brand),
      (product.countInStock = countInStock),
      (product.description = description),
      (product.category = category)

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Produto não encontrado')
  }
})

// @desc    Create new Review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewd = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewd) {
      res.status(400)
      throw new Error('Produto já avaliado')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Avaliação submetida' })
  } else {
    res.status(404)
    throw new Error('Produto não encontrado')
  }
})

// @desc    Get Top Rated Products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {})

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
