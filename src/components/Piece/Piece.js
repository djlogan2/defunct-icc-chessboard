import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classes from './piece.module.css'

import { DATA_TRANSFER } from '../../constants/systemConstants'

const Piece = ({
  id,
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
    height: size,
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center'
  })

  useEffect(() => {
    updatePieceStyle({
      width: size,
      height: size,
      position: 'relative',
      display: 'inline-block',
      textAlign: 'center'
    })
  }, [size])

  const [isDragging, updateIsDragging] = useState(false)

  const handleDragStart = (event) => {
    event.dataTransfer.setData(DATA_TRANSFER, pieceName)

    if (currentPiece !== pieceName) {
      handlePieceClick(pieceName)
      updateIsDragging(true)
    }
  }

  const handleDragEnd = () => {
    updateIsDragging(false)
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
    currentStyles.pointerEvents = 'none'
    currentStyles.zIndex = 999

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

  const handleTouchEnd = () => {
    updatePieceStyle({
      width: size,
      height: size,
      position: 'relative',
      display: 'inline-block',
      textAlign: 'center'
    })
  }

  return (
    <img
      id={id}
      alt={description}
      src={pieceImage}
      draggable
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        ...pieceStyle,
        opacity: isDragging ? 0 : 1
      }}
      className={classes.piece}
    />
  )
}

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Piece
