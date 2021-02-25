import React from 'react'
import PropTypes from 'prop-types'

import style from './piece.module.css'

const Piece = ({ pieceImage, description, size, handlePieceClick }) => {
  return (
    <img
      onClick={handlePieceClick}
      alt={description}
      src={pieceImage}
      className={style.piece}
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
  )
}

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Piece
