import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { DATA_TRANSFER } from '../../constants/systemConstants'

const Piece = ({
  pieceImage,
  description,
  pieceName,
  size,
  handlePieceClick,
  currentPiece,
  updateDataTransfer
}) => {
  const [pieceStyle, updatePieceStyle] = useState({
    width: size,
    height: 'auto',
    position: 'absolute',
    margin: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  })

  const handleDragStart = (event) => {
    event.dataTransfer.setData(DATA_TRANSFER, pieceName)

    if (currentPiece !== pieceName) {
      handlePieceClick(pieceName)
    }
  }

  const handleTouchStart = (event) => {
    updateDataTransfer(pieceName)

    if (currentPiece !== pieceName) {
      handlePieceClick(pieceName)
    }

    const currentStyles = {}
    currentStyles.height = event.target.clientHeight
    currentStyles.width = event.target.clientWidth
    currentStyles.position = 'fixed'

    updatePieceStyle(currentStyles)
  }

  const handleTouchMove = (event) => {
    if (event.target) {
      const currentStyles = { ...pieceStyle }
      if (event.clientX) {
        // mousemove
        currentStyles.left = event.clientX - event.target.clientWidth / 2
        currentStyles.top = event.clientY - event.target.clientHeight / 2
      } else {
        // touchmove
        currentStyles.left =
          event.changedTouches[0].clientX - event.target.clientWidth / 2
        currentStyles.top =
          event.changedTouches[0].clientY - event.target.clientHeight / 2
      }

      updatePieceStyle(currentStyles)
    }
  }

  return (
    <img
      alt={description}
      src={pieceImage}
      draggable
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onDragStart={handleDragStart}
      style={pieceStyle}
    />
  )
}

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Piece
