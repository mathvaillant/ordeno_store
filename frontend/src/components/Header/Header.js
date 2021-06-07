import React from 'react'
import { Route } from 'react-router-dom'
import './Header.scss'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/userActions'
import SearchBox from '../SearchBox/SearchBox'
import Cart from '../../images/cart.png'
function Header() {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const cart = useSelector((state) => state.cart)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar collapseOnSelect className='p-1 header__navbar' expand='lg'>
      <LinkContainer className='header__container__logo' to='/'>
        <Navbar.Brand>ORDENÔ</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' className='navbar__collapsed'>
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

          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Adm' id='adminmenu'>
              <LinkContainer to='/admin/userList'>
                <NavDropdown.Item>Usuários</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productList'>
                <NavDropdown.Item>Produtos</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderList'>
                <NavDropdown.Item>Pedidos</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}

          <Route render={({ history }) => <SearchBox history={history} />} />
          <LinkContainer to='/cart' className='navbar__menu__links '>
            <Nav.Link>
              <img
                src={Cart}
                alt=''
                style={{
                  marginRight: '-8px',
                }}
              />
              <span
                style={{
                  backgroundColor: 'red',
                  borderRadius: '50%',
                  padding: '1px 7px',
                  marginTop: '-2px',
                  fontSize: '1rem',
                }}>
                {cart.cartItems.length}
              </span>
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
