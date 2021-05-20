import React from 'react'
import './Header.scss'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

function Header() {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header className='header'>
      <Navbar collapseOnSelect className='p-1 header__navbar'>
        <Container className='header__container'>
          <LinkContainer className='header__container__logo' to='/'>
            <Navbar.Brand>ORDENÔ</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <span>Perfil</span>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <span>Sair</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login' className='navbar__menu__links '>
                  <Nav.Link>Entrar</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to='/cart' className='navbar__menu__links '>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>{' '}
                  <span
                    style={{
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      padding: '3px 6.3px',
                      marginTop: '-5px',
                    }}>
                    {cart.cartItems.length}
                  </span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
