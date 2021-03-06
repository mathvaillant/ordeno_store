import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

import './CartScreen.scss'

function CartScreen({ match, location, history }) {
  const productId = match.params.id

  const amount = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, amount))
    }
  }, [dispatch, productId, amount])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div className='CartScreen'>
      <Row>
        <Col md={8}>
          <h1>Carrinho</h1>
          {cartItems.length === 0 ? (
            <Message>
              Seu carrinho está vazio{' '}
              <Link className='CartScreen__backBtn' to='/'>
                Voltar
              </Link>{' '}
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        className='listgroup__item__select'
                        as='select'
                        value={item.amount}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            style={{ color: 'white' }}
                            key={x + 1}
                            value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.amount, 0)}) items
                </h5>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.amount * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>
                  Proceder para o Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen
