import React from 'react'
import { Card } from 'react-bootstrap'
import './Product.scss'
import Rating from '../Rating/Rating'

function Product({ product }) {
  return (
    <Card className='my-3 mp-3 rounded product'>
      {/* Each product item has it's own url */}
      <a href={`/product/${product._id}`}>
        <Card.Img className='product__img' src={product.image} variant='top' />
      </a>

      <Card.Body className='product__body'>
        <a className='product__body__a' href={`/product/${product._id}`}>
          <Card.Title as='div' className='product__body__title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as='div' className='product__body__rating'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3' className='product__body__price'>
          €{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
