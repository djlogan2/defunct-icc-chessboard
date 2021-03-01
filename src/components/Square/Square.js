import React from 'react'
import PropTypes from 'prop-types'

import Piece from '../Piece/Piece'
import Circle from '../Circle/Circle'

import styles from './square.module.css'
import LegalMove from '../LegalMove/LegalMove'

const Square = ({
  color,
  size,
  circle,
  piece,
  circleColor,
  handlePieceClick,
  pieceName,
  pieceDepends,
  legalMoves,
  updateSquareMouseDown,
  updateSquareMouseUp
}) => {
  const handleMouseUp = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      updateSquareMouseUp(pieceName)
    }
  }

  const handleMouseDown = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      updateSquareMouseDown(pieceName)
    }
  }

  return (
    <button
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
      className={styles.square}
      onClick={() => {
        handlePieceClick(pieceDepends)
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        position: 'relative',
        outline: 'none'
      }}
    >
      {!!Object.keys(piece).length && (
        <Piece
          handlePieceClick={handlePieceClick}
          pieceImage={piece.image}
          description={piece.description || 'not now'}
          size={size * 0.8}
        />
      )}
      {!!circle && <Circle size={size * 0.8} strokeStyle={circleColor} />}
      {!!legalMoves && legalMoves.includes(pieceName) && (
        <LegalMove size={size * 0.3} />
      )}
    </button>
  )
}

Square.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  circle: PropTypes.bool.isRequired,
  piece: PropTypes.object
}

export default Square
