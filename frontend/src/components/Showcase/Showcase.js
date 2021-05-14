import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bag from '../../images/bag.png'
import './Showcase.scss'

export default class Showcase extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  render() {
    return (
      <>
        <div className='showcase'>
          <button>Ver Produtos</button>
          <img src={Bag} alt='bag.png' />
        </div>
      </>
    )
  }
}
