import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../types/userTypes'
import './LoginScreen.scss'

const UserEditScreen = ({ match, history }) => {
  const userID = match.params.id
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userID) {
        dispatch(getUserDetails(userID))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, userID, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    const _id = userID
    dispatch(updateUser({ _id, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Voltar
      </Link>
      <FormContainer>
        <h4>
          Atualizar dados de: <small>{name ? name : ''}</small>
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
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='isadmin'>
            <Form.Label>Administrador?</Form.Label>
            <Form.Check
              type='checkbox'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Atualizar
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default UserEditScreen
