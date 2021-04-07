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

  const image = document.createElement('img')
  image.src = pieceImage

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, size, size)

  image.src = canvas.toDataURL()

  const handleDragStart = (event) => {
    event.dataTransfer.setData(DATA_TRANSFER, pieceName)
    event.dataTransfer.dropEffect = 'none'

    event.dataTransfer.setDragImage(image, size / 2, size / 2)

    if (currentPiece !== pieceName) {
      handlePieceClick(pieceName)
    }
  }

  const handleOnDrag = (event) => {
    event.dataTransfer.dropEffect = 'none'
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
    <div
      id={id}
      draggable
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={handleDragStart}
      onDrag={handleOnDrag}
      style={{
        ...pieceStyle
      }}
    >
      <img
        alt={description}
        src={pieceImage}
        style={{
          ...pieceStyle
        }}
        className={classes.piece}
      />
    </div>
  )
}

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Piece
