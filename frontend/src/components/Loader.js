import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '80px',
        height: '80px',
        margin: 'auto',
        marginTop: '2rem',
        display: 'block',
      }}>
      <span className='sr-only'>Encontrando Produtos...</span>
    </Spinner>
  )
}

export default Loader
