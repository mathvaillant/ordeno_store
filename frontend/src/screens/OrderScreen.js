import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
import Message from '../components/Message/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const OrderScreen = ({ match }) => {
  const orderID = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.amount, 0)
    )
  }

  useEffect(() => {
    if (!order || order._id !== orderID) {
      dispatch(getOrderDetails(orderID))
    }
  }, [order, orderID])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h4>Pedido {orderID}</h4>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>Envio</h4>
              <p>
                {' '}
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Endereço: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Recebido em {order.isDeliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>A caminho</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Método de Pagamento</h4>
              <p>
                <strong>Método: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Pago em {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Espera pagamento</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Items</h4>
              {order.orderItems.length === 0 ? (
                <Message>A encomenda está vazia</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.amount} x ${item.price} = $
                          {item.amount * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>Resumo de Encomenda</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>R$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Frete</Col>
                  <Col>R$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>R$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen