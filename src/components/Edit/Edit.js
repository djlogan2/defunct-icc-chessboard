import React from 'react'
import PropTypes from 'prop-types'

const Edit = ({ pieceImages, size }) => {
  const keys = Object.keys(pieceImages)

  const pieces = keys.map((key) => {
    return (
      <img
        key={key}
        alt={key}
        src={pieceImages[key]}
        width={size}
        height={size}
      />
    )
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {pieces}
    </div>
  )
}

Edit.propTypes = {
  pieceImages: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

export default Edit
