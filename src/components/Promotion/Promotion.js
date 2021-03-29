import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { generateCoordinatesForPromotion } from '../../utils/utils'
import { PROMOTION_SIZE_RELATIVE } from '../../constants/systemConstants'

const Promotion = ({
  promotionPieces,
  pieceImages,
  onPromotion,
  size,
  styles,
  perspective,
  promotionColor,
  column
}) => {
  const piecesStyles = generateCoordinatesForPromotion(
    promotionPieces.length,
    perspective,
    promotionColor,
    size,
    column
  )

  const pieces = promotionPieces.map((piece, index) => {
    return (
      <button
        key={piece}
        style={{
          width: size * PROMOTION_SIZE_RELATIVE,
          height: size * PROMOTION_SIZE_RELATIVE,
          zIndex: 999,
          outline: 'none',
          borderRadius: '50%',
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
            pointerEvents: 'none',
            borderRadius: '50%'
          }}
          width={size * PROMOTION_SIZE_RELATIVE}
          height={size * PROMOTION_SIZE_RELATIVE}
          alt={piece}
          src={pieceImages[`${promotionColor}${piece.toUpperCase()}`]}
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
  size: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired
}

export default Promotion
