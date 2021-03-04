import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'
import Loader from '../components/Loader'
import Message from '../components/Message/Message'
import { listProducts } from '../actions/productActions'

import PropTypes from 'prop-types'

function HomeScreen() {
  const dispatch = useDispatch()

  // useSelector access the redux store's state
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  console.log('Loading:', loading, 'error:', error, 'products:', products)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <div title='HomeScreen'>
      <h3
        title='h3'
        style={{
          borderBottom: 'solid 1px',
          borderWidth: 'thin',
        }}
        className='latest'>
        Últimas Novidades Ordenô
      </h3>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products ? (
        <Row title='HomeScreenRow'>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        ''
      )}
    </div>
  )
}

HomeScreen.propType = {
  products: PropTypes.arrayOf(PropTypes.string),
}

export default HomeScreen
