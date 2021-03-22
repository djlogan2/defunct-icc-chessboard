import React from 'react'
import {
  FILES_BOTTOM_SIDE,
  FILES_DISABLED,
  FILES_TOP_SIDE,
  FILES_ARRAY
} from '../../constants/boardConstants'
import { WHITE_PLAYER_PERSPECTIVE } from '../../constants/systemConstants'

const Files = ({ width, height, side, perspective, filesStyle }) => {
  if (side === FILES_DISABLED) {
    return null
  }

  return (
    <div
      style={{
        width,
        height,
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
        <p
          key={index}
          style={{
            marginTop: side === FILES_BOTTOM_SIDE ? 0 : 'auto',
            marginBottom: side === FILES_TOP_SIDE ? 0 : 'auto',
            verticalAlign: 'text-bottom',
            ...filesStyle
          }}
        >
          {file}
        </p>
      ))}
    </div>
  )
}

export default Files
