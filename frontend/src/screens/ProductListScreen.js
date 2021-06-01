import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const deleteHandler = (id) => {
    if (
      window.confirm(
        'Esta ação irá deletar o usuário permanentemente. Deseja continuar?'
      )
    ) {
      // DELETE PRODUCTS}
    }
  }

  const createdProductHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className='ProductListScreen'>
      <Row className='align-items-center'>
        <Col>
          <h3>Produtos</h3>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createdProductHandler}>
            <i className='fas fa-plus'></i> Criar Produto
          </Button>
        </Col>
      </Row>
      <h4>Usuários</h4>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products ? (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>PREÇO</th>
              <th>CATEGORIA</th>
              <th>MARCA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>R${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td style={{ display: 'flex' }}>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deleteHandler(product._id)
                    }}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default ProductListScreen
