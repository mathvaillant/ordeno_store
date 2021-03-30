import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message/Message'
import Rating from '../components/Rating/Rating'
import './ProductScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../actions/productActions'

import PropTypes from 'prop-types'

function ProductScreen({ history, match }) {
  const [amount, setAmount] = useState(0)

  const dispatch = useDispatch()

  // useSelector access the redux store's state
  const productDetailsList = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetailsList

  useEffect(() => {
    dispatch(productDetails(match.params.id))
  }, [match])

  const addToCartHandler = () => {
    // History redirects the page
    history.push(`/cart/${match.params.id}?amount=${amount}`)
  }

  return (
    <>
      <Link className='btn mb-3' to='/'>
        BACK
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6} lg={3}>
            <ListGroup variant='flush' className='listgroup'>
              <ListGroup.Item className='listgroup__item'>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className='listgroup__item'>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item className='listgroup__item'>
                <h5>Price: €{product.price}</h5>
              </ListGroup.Item>
              <ListGroup.Item className='listgroup__item'>
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3}>
            <Card style={{ background: 'transparent' }}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='listgroup__item'>
                  <Row>
                    <Col className='altWhite'>Price:</Col>
                    <Col className='altWhite'>€{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='listgroup__item'>
                  <Row>
                    <Col className='altWhite'>Status:</Col>
                    <Col
                      className={
                        product.countInStock > 0 ? 'inStock' : 'outOfStock'
                      }>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Amount</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className='listgroup__item'>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

ProductScreen.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default ProductScreen
