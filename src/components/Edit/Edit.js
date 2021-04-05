import React from 'react'
import PropTypes from 'prop-types'

const Edit = ({ pieceImages, size, onAdd, style }) => {
  const keys = Object.keys(pieceImages)

  const pieces = keys.map((key) => {
    return (
      <img
        key={key}
        alt={key}
        src={pieceImages[key]}
        width={size}
        onDragStart={() => onAdd(key)}
        height={size}
        draggable
      />
    )
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...style
      }}
    >
      {pieces}
    </div>
  )
}

Edit.propTypes = {
  pieceImages: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired
}

export default Edit
