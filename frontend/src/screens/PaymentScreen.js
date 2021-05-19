import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

import PayPal from '../images/PPLogo.png'
import Card from '../images/cardLogo.png'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <div className='ShippingScreen' style={{ height: '100vh' }}>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Método de Pagamento</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Selecionar Método</Form.Label>

            <Col>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }></Form.Check>
                <img
                  src={PayPal}
                  alt='paypal.png'
                  style={{ width: '50px', height: 'auto', marginLeft: '1rem' }}
                />
              </div>
              <br />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Check
                  type='radio'
                  label='Stripe'
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  disabled
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }></Form.Check>
                <img
                  src={Card}
                  alt='paypal.png'
                  style={{ width: '50px', height: 'auto', marginLeft: '1rem' }}
                />
              </div>
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continuar
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default PaymentScreen
