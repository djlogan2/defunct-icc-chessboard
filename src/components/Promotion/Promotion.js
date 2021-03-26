import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { BOARD_SIZE_RELATIVE } from '../../constants/systemConstants'
import { generateCoordinatesForPromotion } from '../../utils/utils'

const Promotion = ({
  promotionPieces,
  pieceImages,
  onPromotion,
  size,
  styles,
  perspective
}) => {

  const piecesStyles = generateCoordinatesForPromotion(
    promotionPieces.length,
    perspective,
    size
  )

  const pieces = promotionPieces.map((piece, index) => {
    return (
      <button
        key={piece}
        style={{
          width: size,
          height: size,
          zIndex: 999,
          outline: 'none',
          ...styles,
          ...piecesStyles[index]
        }}
        onClick={() => onPromotion(piece)}
      >
        <img
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
          width={size}
          height={size}
          alt={piece}
          src={pieceImages[`${perspective}${piece.toUpperCase()}`]}
        />
      </button>
    )
  })

  return <Fragment>{pieces}</Fragment>
}

Promotion.propTypes = {
  promotionPieces: PropTypes.array.isRequired,
  onPromotion: PropTypes.func.isRequired,
  pieceImages: PropTypes.object.isRequired,
  perspective: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Promotion
