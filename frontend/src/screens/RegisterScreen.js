import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import { register } from '../actions/userActions'
import './RegisterScreen.scss'

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('As senhas não correspondem')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <div className='LoginScreen'>
      <FormContainer>
        <h1>Criar Conta</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
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
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Comfirmar Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Comfirmar Senha'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary ' className='register'>
            Registrar
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Já tem uma conta connosco? {'   '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              <small>Entrar</small>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  )
}

export default RegisterScreen
