import React from 'react'
import './Footer.scss'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Ordenô Store 2021
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
