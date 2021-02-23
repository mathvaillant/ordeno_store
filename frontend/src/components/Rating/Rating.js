import React from 'react'
import './Rating.scss'

import PropTypes from 'prop-types'

function Rating({ value, text }) {
  return (
    <div className='rating pl-0 pt-1 pb-2'>
      <span>
        <i
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'fa fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'fa fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'fa fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'fa fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'fa fa-star'
          }
        />
      </span>
      <span className='rating__text ml-1'>{text && text}</span>
    </div>
  )
}

/* PropTypes will typecheck the props */
Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
}

export default Rating
