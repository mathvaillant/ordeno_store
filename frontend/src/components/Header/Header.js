import React from 'react'
import './Header.scss'
import Logo from '../../images/_logo_crop.png'

import { Navbar, Nav, Container, Image } from 'react-bootstrap'

function Header() {
  return (
    <header className='header'>
      <Navbar variant='dark' collapseOnSelect className='p-1'>
        <Container>
          <Navbar.Brand href='/' style={{ width: '70px' }}>
            <Image src={Logo} alt='' fluid />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='fas fa-user'></i> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
