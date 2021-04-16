import React from 'react'

const PreviousMoveAlert = ({ lastMove, accessibilityPieces }) => {
  return (
    <p
      role='alert'
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        fontSize: '0px'
      }}
      aria-live='assertive'
    >
      {`${
        accessibilityPieces[`${lastMove.color}${lastMove.piece.toUpperCase()}`]
      } ${lastMove.from} ${lastMove.to}`}
    </p>
  )
}

export default PreviousMoveAlert
