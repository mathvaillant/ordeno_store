import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'

import PropTypes from 'prop-types'

function HomeScreen() {
  const [products, setProducts] = useState([])

  console.log(products)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products')
      const data = response.data

      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h3
        style={{
          borderBottom: 'solid 1px',
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

HomeScreen.propType = {
  products: PropTypes.arrayOf(PropTypes.string.isRequired),
}

export default HomeScreen
