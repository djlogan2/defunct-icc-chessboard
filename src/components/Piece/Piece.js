import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import style from './piece.module.css'
import { DATA_TRANSFER } from '../../constants/systemConstants'

const Piece = ({
  pieceImage,
  description,
  pieceName,
  size,
  handlePieceClick,
  currentPiece
}) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData(DATA_TRANSFER, pieceName)

    if (currentPiece !== pieceName) {
      handlePieceClick(pieceName)
    }
  }

  return (
    <Fragment>
      <img
        alt={description}
        src={pieceImage}
        className={style.piece}
        draggable
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
