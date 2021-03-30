import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroud, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import { addToCart } from '../actions/cartActions'

function CartScreen({ match, location, history }) {
  const productId = match.params.id

  const amount = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, amount))
    }
  }, [dispatch, productId, amount])

  return <div>Cart</div>
}

export default CartScreen
