import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message/Message'
import Rating from '../components/Rating/Rating'
import './ProductScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../types/productTypes'

import PropTypes from 'prop-types'

function ProductScreen({ history, match }) {
  const [amount, setAmount] = useState(1)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

  const dispatch = useDispatch()

  const productDetailsList = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetailsList

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      alert('Avaliação submetida')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?amount=${amount}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating: rating,
        comment: comment,
      })
    )
  }

  return (
    <div className='productScreen'>
      <Link className='btn mb-3' to='/'>
        VOLTAR
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
                  <h5>Preço: €{product.price}</h5>
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
                      <Col className='altWhite'>Preço:</Col>
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
                        {product.countInStock > 0
                          ? 'Em estoque'
                          : 'Fora de estoque'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className='listgroup__item'>
                      <Row style={{ display: 'flex', alignItems: 'center' }}>
                        <Col className='altWhite'>Quantidade: </Col>
                        <Col>
                          <Form.Control
                            className='listgroup__item__select'
                            as='select'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option
                                  style={{ color: 'white' }}
                                  key={x + 1}
                                  value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
                      Adicionar ao carrinho
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <h3>Avaliações</h3>
              {product.reviews.length === 0 && (
                <Message>Este produto ainda não possui avaliações</Message>
              )}
              <ListGroup variant='flush' className='reviews'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className='review'>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h5>Escrever uma avaliação</h5>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Nota</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Selecionar...</option>
                          <option value='1'>1 - Ruim 😓 </option>
                          <option value='2'>2 - Razoável 😐</option>
                          <option value='3'>3 - Bom 🙂</option>
                          <option value='4'>4 - Muito Bom 😃</option>
                          <option value='5'>5 - Excelente 😍</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comentário</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='light'>
                        Avaliar
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Por Favor, <Link to='/login'> entre com sua conta</Link>{' '}
                      para escrever uma avaliação.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
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
