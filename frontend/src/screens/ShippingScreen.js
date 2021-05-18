import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <div className='ShippingScreen' style={{ height: '100vh' }}>
      <FormContainer>
        <h1>Envio</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type='text'
              placeholder='Endereço'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type='text'
              placeholder='Cidade'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type='text'
              placeholder='Código Postal'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>País</Form.Label>
            <Form.Control
              type='text'
              placeholder='País'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continuar
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ShippingScreen
