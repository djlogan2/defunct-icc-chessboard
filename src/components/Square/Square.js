import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { SECOND_COLOR } from '../../constants/systemConstants'
import Piece from '../Piece/Piece'
import Circle from '../Circle/Circle'

import styles from './square.module.css'
import LegalMove from '../LegalMove/LegalMove'

const Square = ({ color, size, circle, isLegal, piece }) => {
  const [isCircle, updateCircle] = useState(circle)

  const handleMouseUp = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      updateCircle(!isCircle)
    }
  }

  return (
    <button
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
      className={color === SECOND_COLOR ? styles.odd : styles.even}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {!!piece && (
        <Piece
          pieceImage={piece.image}
          description={piece.description}
          size={size * 0.8}
        />
      )}
      {!!isCircle && <Circle size={size * 0.8} />}
      {!!isLegal && <LegalMove size={size * 0.3} />}
    </button>
  )
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  isLegal: PropTypes.bool.isRequired,
  circle: PropTypes.bool.isRequired,
  piece: PropTypes.object
}

export default Square
