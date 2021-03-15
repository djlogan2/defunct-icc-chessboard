import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import style from './piece.module.css'
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
  const [moving, updateMoving] = useState(null)
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

    const currentMoving = event.target
    currentMoving.style.position = 'fixed'

    updateMoving(currentMoving)
  }

  const handleTouchMove = (event) => {
    if (moving) {
      moving.style.left = event.changedTouches[0].clientX
      moving.style.top = event.changedTouches[0].clientY
      console.log(moving);
    }
  }

  return (
    <Fragment>
      <img
        alt={description}
        src={pieceImage}
        className={style.piece}
        draggable
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onDragStart={handleDragStart}
        style={{
          width: size,
          height: 'auto',
          position: 'absolute',
          margin: 0,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </Fragment>
  )
}

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Piece
