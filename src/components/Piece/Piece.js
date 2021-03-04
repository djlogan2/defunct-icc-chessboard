import React from 'react'
import PropTypes from 'prop-types'
import { DragPreviewImage, useDrag } from 'react-dnd'

import style from './piece.module.css'

const Piece = ({ pieceImage, description, size, handlePieceClick }) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      item: { type: description },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }),
    []
  )

  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImage} />
      <img
        ref={drag}
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
          transform: 'translate(-50%, -50%)',
          opacity: isDragging ? 0.5 : 1
        }}
      />
    </>
  )
}

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default Piece
