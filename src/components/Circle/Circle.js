import React from 'react'
import PropTypes from 'prop-types'

import style from './circle.module.css'

const Circle = ({ size }) => {
  return (
    <img
      src='https://freepngimg.com/thumb/shape/30052-8-circle-transparent-background.png'
      alt='circle'
      className={style.circle}
      style={{ width: size, height: 'auto' }}
    />
  )
}

Circle.propTypes = {
  size: PropTypes.number.isRequired
}

export default Circle
