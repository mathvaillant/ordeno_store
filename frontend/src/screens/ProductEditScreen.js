import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../types/productTypes'
/* import './ProductEditScreen.scss' */

const ProductEditScreen = ({ match, history }) => {
  const productID = match.params.id
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productList')
    } else {
      if (!product.name || product._id !== productID) {
        dispatch(listProductDetails(productID))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCountInStock(product.countInStock)
        setCategory(product.category)
        setDescription(product.description)
      }
    }
  }, [product, dispatch, productID, history, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productID,
        name: name,
        price: price,
        image: image,
        brand: brand,
        countInStock: countInStock,
        category: category,
        description: description,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Voltar
      </Link>
      <FormContainer>
        <h4>
          Atualizar dados do produto:{' '}
          <small>{product.name ? product.name : ''}</small>
        </h4>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nome'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type='number'
              placeholder='Preço'
              value={price}
              onChange={(e) => setPrice(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='imagem'>
            <Form.Label>Imagem</Form.Label>
            <Form.Control
              type='text'
              placeholder='Imagem'
              value={image}
              onChange={(e) => setImage(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type='text'
              placeholder='Marca'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Em estoque</Form.Label>
            <Form.Control
              type='text'
              placeholder='Em estoque'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type='text'
              placeholder='Categoria'
              value={category}
              onChange={(e) => setCategory(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type='text'
              placeholder='Descrição'
              value={description}
              onChange={(e) => setDescription(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Atualizar
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
