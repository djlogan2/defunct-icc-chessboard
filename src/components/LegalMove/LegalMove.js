import React from 'react'
import PropTypes from 'prop-types'

const LegalMove = ({ size, id }) => {
  return (
    <div
      id={id}
      style={{
        position: 'absolute',
        margin: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
