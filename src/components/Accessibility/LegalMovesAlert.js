import React from 'react'

const LegalMovesAlert = ({ legalMoves, legalMovesAlert }) => {
  return (
    <div
      role='alert'
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        fontSize: '0px'
      }}
      aria-live='assertive'
    >
      {`${legalMovesAlert} ${legalMoves.join(', ')}`}
    </div>
  )
}

export default LegalMovesAlert
