import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classes from './piece.module.css'

const Piece = ({
  id,
  pieceImage,
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

  const handleDragStart = (event) => {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'

    if (currentPiece !== pieceName) {
      handlePieceClick(pieceName)
    }
  }

  const handleOnDrag = (event) => {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
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
        ...pieceStyle,
        background: `url(${pieceImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: size,
        border: 'none'
      }}
      className={classes.div}
    />
  )
}

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Piece
