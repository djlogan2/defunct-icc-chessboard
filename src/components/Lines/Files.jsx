import React from 'react'
import {
  FILES_ARRAY,
  FILES_BOTTOM_SIDE,
  FILES_DISABLED,
  FILES_TOP_SIDE
} from '../../constants/boardConstants'
import { WHITE_PLAYER_PERSPECTIVE } from '../../constants/systemConstants'

const Files = ({ width, side, perspective }) => {
  if (side === FILES_DISABLED) {
    return null
  }

  return (
    <div
      style={{
        width,
        bottom: side === FILES_BOTTOM_SIDE && 0,
        top: side === FILES_TOP_SIDE && 0,
        position: 'absolute',
        display: 'flex',
        flexDirection:
          perspective === WHITE_PLAYER_PERSPECTIVE ? 'row' : 'row-reverse',
        justifyContent: 'space-around'
      }}
    >
      {FILES_ARRAY.map((file, index) => (
        <p key={index}>{file}</p>
      ))}
    </div>
  )
}

export default Files
