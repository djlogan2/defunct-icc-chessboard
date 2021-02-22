import React from 'react'
import PropTypes from 'prop-types'

const LegalMove = ({ size }) => {
  return (
    <div
      style={{
        position: 'relative',
        left: `calc(50% - ${size / 2}%)`,
        height: size,
        width: size,
        backgroundColor: '#bbb',
        borderRadius: '50%'
      }}
    />
  )
}

LegalMove.propTypes = {
  size: PropTypes.number.isRequired
}

export default LegalMove
