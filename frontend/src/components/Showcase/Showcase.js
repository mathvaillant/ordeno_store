import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Carousel, Image } from 'react-bootstrap'
import Bag1 from '../../images/bag1.jpg'
import Bag2 from '../../images/bag2.jpg'
import Bag3 from '../../images/bag3.jpg'
import Bag4 from '../../images/bag4.jpg'
import './Showcase.scss'

const Showcase = () => {
  const handleClick = () => {
    document.documentElement.scrollTop = 600
  }

  const Bags = [
    { image: Bag1 },
    { image: Bag2 },
    { image: Bag3 },
    { image: Bag4 },
  ]

  return (
    <Carousel pause='hover' className='carousel bg-dark'>
      {Bags.map((bag, index) => (
        <Carousel.Item key={index} interval={7000}>
          <Image src={bag.image} fluid />
        </Carousel.Item>
      ))}
      <button onClick={handleClick}>Ver Produtos</button>
    </Carousel>
  )
}

export default Showcase
