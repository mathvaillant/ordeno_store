import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating/Rating'
import './ProductScreen.scss'

import PropTypes from 'prop-types'

function ProductScreen({ match }) {
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${match.params.id}`)
      const data = response.data

      setProduct(data)
    }

    fetchProduct()
  }, [match])

  return (
    <>
      <Link className='btn mb-3' to='/'>
        Back
      </Link>
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
              <ListGroup.Item className='listgroup__item'>
                <Button
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
