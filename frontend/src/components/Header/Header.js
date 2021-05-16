import React, { useEffect, useRef } from 'react'
import './Header.scss'
import { LinkContainer } from 'react-router-bootstrap'

import { Navbar, Nav, Container } from 'react-bootstrap'

function Header() {
  return (
    <header className='header'>
      <Navbar collapseOnSelect className='p-1'>
        <Container className='header__container'>
          <LinkContainer className='header__container__logo' to='/'>
            <Navbar.Brand>ORDENÔ</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/login' className='navbar__menu__links '>
                <Nav.Link>Entrar</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart' className='navbar__menu__links '>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>
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
