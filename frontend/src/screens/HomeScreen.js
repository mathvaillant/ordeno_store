import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'
import { listProducts } from '../actions/productActions.js'

import PropTypes from 'prop-types'

function HomeScreen() {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

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
        <small>Encontrando produtos...</small>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Row title='HomeScreenRow'>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

HomeScreen.propType = {
  products: PropTypes.arrayOf(PropTypes.string.isRequired),
}

export default HomeScreen
