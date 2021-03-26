import PropTypes from 'prop-types'
import React from 'react'
import { DATA_TRANSFER } from '../../constants/systemConstants'
import LegalMove from '../LegalMove/LegalMove'

import Piece from '../Piece/Piece'
import Promotion from '../Promotion/Promotion';

import styles from './square.module.css'

const Square = ({
  color,
  size,
  piece,
  handlePieceClick,
  pieceName,
  legalMoves,
  smallSize,
  showLegalMoves,
  signatureSquares,
  updateSquareMouseDown,
  updateSquareMouseUp,
  currentPiece,
  dataTransfer,
  updateDataTransfer,
  promotion,
  promotionPieces,
  promotionStyles,
  onPromotion,
  pieceImages
}) => {
  const handleMouseUp = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      updateSquareMouseUp(pieceName)
    }
  }

  const handleMouseDown = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      updateSquareMouseDown({ event, piece: pieceName })
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()

    if (!!legalMoves && legalMoves.includes(pieceName)) {
      handlePieceClick(pieceName)
    } else {
      const clickedPieceName = event.dataTransfer.getData(DATA_TRANSFER)
      handlePieceClick(clickedPieceName)
    }
  }

  const handleTouchEnd = (event) => {
    if (event.currentTarget.tagName !== 'HTML') {
      let target
      if (event.clientX) {
        target = document.elementFromPoint(event.clientX, event.clientY)
      } else {
        target = document.elementFromPoint(
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY
        )
      }

      if (target && target.id) {
        if (!!legalMoves && legalMoves.includes(target.id)) {
          handlePieceClick(target.id)
        } else {
          handlePieceClick(dataTransfer)
        }
      }
    }
  }

  return (
    <button
      id={pieceName}
      onDrop={handleDrop}
      onTouchEnd={handleTouchEnd}
      onDragOver={(e) => e.preventDefault()}
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
        padding: 0,
        backgroundColor:
          currentPiece === pieceName ? color.active : color.default,
        position: 'relative',
        outline: 'none'
      }}
    >
      {signatureSquares && smallSize > size && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        >
          {pieceName}
        </div>
      )}
      {!!Object.keys(piece).length && (
        <Piece
          id={pieceName}
          handlePieceClick={handlePieceClick}
          pieceImage={piece?.image}
          description={piece?.description}
          size={size}
          pieceName={pieceName}
          currentPiece={currentPiece}
          updateDataTransfer={updateDataTransfer}
        />
      )}
      {showLegalMoves && !!legalMoves && legalMoves.includes(pieceName) && (
        <LegalMove id={pieceName} size={size * 0.3} />
      )}
      {!!promotion && promotion.piece === pieceName &&
      <Promotion
        perspective={promotion.color}
        onPromotion={onPromotion}
        size={size}
        promotionPieces={promotionPieces}
        pieceImages={pieceImages}
        styles={promotionStyles}
      />
      }
    </button>
  )
}

Square.propTypes = {
  color: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  piece: PropTypes.object
}

export default Square
