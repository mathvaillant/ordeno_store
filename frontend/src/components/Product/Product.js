import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Product.scss'
import Rating from '../Rating/Rating'

function Product({ product }) {
  const { _id, image, name, numReviews, rating, price } = product

  return (
    <Card className='my-3 mp-3  product'>
      {/* Each product item has it's own url */}
      <Link to={`/product/${_id}`}>
        <Card.Img
          className='product__img'
          src={image}
          variant='top'
          alt={name}
        />
      </Link>

      <Card.Body className='product__body'>
        <Link className='product__body__a' to={`/product/${_id}`}>
          <Card.Title as='div' className='product__body__title'>
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='product__body__rating'>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3' className='product__body__price'>
          €{price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    numReviews: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }),
}

export default Product
