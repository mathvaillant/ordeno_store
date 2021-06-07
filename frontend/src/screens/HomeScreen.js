import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'
import Loader from '../components/Loader'
import Message from '../components/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
import './HomeScreen.scss'

import PropTypes from 'prop-types'

function HomeScreen({ match }) {
  const dispatch = useDispatch()
  const keyword = match.params.keyword

  const productList = useSelector((state) => state.productList)
  const { products, loading, error } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <Meta />
      <div title='HomeScreen' className='HomeScreen'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : products.length > 1 ? (
          <Row title='HomeScreenRow' className='HomeScreenRow'>
            {products.map((product) => (
              <Col
                className='HomeScreenRow__col'
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={product._id}>
                <Product className='HomeScreenRow__product' product={product} />
              </Col>
            ))}
          </Row>
        ) : products.length === 1 ? (
          <Row title='HomeScreenRow' className='HomeScreenRow'>
            {products.map((product) => (
              <Col
                className='HomeScreenRow__col'
                sm={12}
                md={12}
                lg={12}
                xl={12}
                key={product._id}>
                <Product className='HomeScreenRow__product' product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

HomeScreen.propType = {
  products: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default HomeScreen
