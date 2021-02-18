import React from 'react'
import {
  RANKS_ARRAY,
  RANKS_DISABLED,
  RANKS_LEFT_SIDE,
  RANKS_RIGHT_SIDE
} from '../../constants/boardConstants'
import { WHITE_PLAYER_PERSPECTIVE } from '../../constants/systemConstants'

const Ranks = ({ height, side, perspective }) => {
  if (side === RANKS_DISABLED) {
    return null
  }

  return (
    <div
      style={{
        height,
        left: side === RANKS_LEFT_SIDE && 0,
        right: side === RANKS_RIGHT_SIDE && 0,
        position: 'absolute',
        display: 'flex',
        flexDirection:
          WHITE_PLAYER_PERSPECTIVE === perspective
            ? 'column-reverse'
            : 'column',
        justifyContent: 'space-around'
      }}
    >
      {RANKS_ARRAY.map((rank, index) => {
        return <p key={index}>{rank}</p>
      })}
    </div>
  )
}

export default Ranks
