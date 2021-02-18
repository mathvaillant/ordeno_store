import React from 'react'
import './Header.scss'
import Logo from '../../images/_logo_crop.png'
import { LinkContainer } from 'react-router-bootstrap'

import { Navbar, Nav, Container, Image } from 'react-bootstrap'

function Header() {
  return (
    <header className='header'>
      <Navbar variant='dark' collapseOnSelect className='p-1'>
        <Container>
          <LinkContainer to='/' style={{ width: '70px' }}>
            <Navbar.Brand>
              <Image src={Logo} alt='' fluid />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Sign In
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
