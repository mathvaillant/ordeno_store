import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'

import PropTypes from 'prop-types'

function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetch('/api/products').then((res) => res.json())
      setProducts(data)
    }

    fetchProducts()
  }, [])

  sessionStorage.setItem('name', 'Matt Vaillant')

  return (
    <div title='HomeScreen'>
      <h3
        title='h3'
        style={{
          borderBottom: 'solid 1px',
          borderWidth: 'thin',
        }}
        className='latest'>
        LATEST PRODUCTS
      </h3>
      <Row title='HomeScreenRow'>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

HomeScreen.propType = {
  products: PropTypes.arrayOf(PropTypes.string.isRequired),
}

export default HomeScreen
