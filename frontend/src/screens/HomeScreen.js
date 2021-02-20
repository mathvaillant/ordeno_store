import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'

import Product from '../components/Product/Product'

function HomeScreen() {
  return (
    <div>
      <h3
        style={{
          borderBottom: 'dashed 1px',
          borderWidth: 'thin',
        }}
        className='latest'>
        LATEST PRODUCTS
      </h3>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
