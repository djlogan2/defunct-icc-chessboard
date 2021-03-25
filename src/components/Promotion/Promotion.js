import React from 'react'
import PropTypes from 'prop-types'

const Promotion = ({ promotionPieces }) => {
  console.log(123);
  const pieces = promotionPieces.map(piece => {
    return (
      <button>
        {piece}
      </button>
    )
  })

  return (
    {pieces}
  )
}

Promotion.propTypes = {
  promotionPieces: PropTypes.array.isRequired
}

export default Promotion
