import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} from '../controllers/productController.js'

import { protect, isAdmin } from '../middleware/authMiddleware.js'

// Add onto the router.route each request
router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
