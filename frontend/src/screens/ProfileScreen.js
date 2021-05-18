import React, { useEffect, useState } from 'react'
import { Form, Row, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader'

import { getUserDetails, updateUserProfile } from '../actions/userActions'
import './LoginScreen.scss'
import { USER_UPDATE_PROFILE_RESET } from '../types/userTypes'

const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [userInfo, history, dispatch, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('As senhas não correspondem')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div className='ProfileScreen' style={{ height: '100vh' }}>
      <Row>
        <Col md={4}>
          <h2>Editar Perfil</h2>
          {error && <Message variant='danger'>{error}</Message>}
          {message && <Message variant='danger'>{message}</Message>}
          {success && <Message variant='success'>Alterações Salvas</Message>}
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

            <Button type='submit' variant='primary'>
              Salvar alterações
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <h2>Meus pedidos</h2>
        </Col>
      </Row>
    </div>
  )
}

export default ProfileScreen
