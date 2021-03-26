import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { BOARD_SIZE_RELATIVE } from '../../constants/systemConstants'
import { generateCoordinatesForPromotion } from '../../utils/utils'

const Promotion = ({
  promotionPieces,
  currentPiece,
  pieceImages,
  onPromotion,
  size,
  styles,
  perspective
}) => {
  const offset = size * 8 * ((1 - BOARD_SIZE_RELATIVE) / 2)

  const piecesStyles = generateCoordinatesForPromotion(
    currentPiece.coordinates,
    promotionPieces.length,
    perspective,
    size,
    currentPiece.color
  )

  const pieces = promotionPieces.map((piece, index) => {
    return (
      <button
        key={piece}
        style={{
          position: 'absolute',
          left: offset + piecesStyles[index].left,
          top: offset + piecesStyles[index].top,
          width: size,
          height: size,
          zIndex: 999,
          outline: 'none',
          ...styles
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
          src={pieceImages[`${currentPiece.color}${piece.toUpperCase()}`]}
        />
      </button>
    )
  })

  return <Fragment>{pieces}</Fragment>
}

Promotion.propTypes = {
  promotionPieces: PropTypes.array.isRequired,
  currentPiece: PropTypes.object.isRequired,
  onPromotion: PropTypes.func.isRequired,
  pieceImages: PropTypes.object.isRequired,
  perspective: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Promotion
