import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'

function HomeScreen() {
  const [products, setProducts] = useState([])

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
