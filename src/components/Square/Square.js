import React from 'react'
import PropTypes from 'prop-types'

import Piece from '../Piece/Piece'
import Circle from '../Circle/Circle'

import styles from './square.module.css'
import LegalMove from '../LegalMove/LegalMove'
import { MODE_EDIT } from '../../constants/systemConstants'

const Square = ({
  color,
  size,
  mode,
  circle,
  piece,
  circleColor,
  handlePieceClick,
  pieceName,
  legalMoves,
  smallSize,
  showLegalMoves,
  signatureSquares,
  updateSquareMouseDown,
  updateSquareMouseUp,
  currentPiece
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

  console.log(signatureSquares, smallSize, size)

  return (
    <button
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
      className={styles.square}
      onClick={() => {
        handlePieceClick(pieceName)
      }}
      style={{
        width: size,
        height: size,
        backgroundColor:
          currentPiece === pieceName ? color.active : color.default,
        position: 'relative',
        outline: 'none'
      }}
    >
      {signatureSquares && smallSize > size && pieceName}
      {!!Object.keys(piece).length && (
        <Piece
          handlePieceClick={handlePieceClick}
          pieceImage={piece.image}
          description={piece.description || 'not now'}
          size={size * 0.8}
        />
      )}
      {!!circle && <Circle size={size * 0.8} strokeStyle={circleColor} />}
      {showLegalMoves &&
        !!legalMoves &&
        mode !== MODE_EDIT &&
        legalMoves.includes(pieceName) && <LegalMove size={size * 0.3} />}
    </button>
  )
}

Square.propTypes = {
  color: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  circle: PropTypes.bool.isRequired,
  piece: PropTypes.object
}

export default Square
