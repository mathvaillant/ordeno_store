import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bag from '../../images/bag.png'
import './Showcase.scss'

export default class Showcase extends Component {
  constructor(props) {
    super(props)

    this.handleClick = () => {
      document.documentElement.scrollTop = 400
    }
  }

  render() {
    return (
      <>
        <div className='showcase'>
          <button onClick={this.handleClick}>Ver Produtos</button>
          <img src={Bag} alt='bag.png' />
        </div>
      </>
    )
  }
}
