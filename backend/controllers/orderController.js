import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    // 400 STATUS - BAD REQUEST
    res.status(400)
    throw new Error('Sem items no carrinho')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    // 201 STATUS - SOMETHING WAS CREATED
    res.status(201).json(createdOrder)
  }
})

// @desc    GET order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    // 404 STATUS - NOT FOUND
    res.status(404)
    throw new Error('Não encontramos a sua encomenda')
  }
})

export { addOrderItems, getOrderByID }
