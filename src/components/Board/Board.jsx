import React from 'react'
import PropTypes from 'prop-types'

import Square from '../Square/Square'
import { COLUMNS_LENGTH, ROWS_LENGTH } from '../../constants/boardConstants'
import { FIRST_COLOR, SECOND_COLOR } from '../../constants/systemConstants'

import styles from './board.module.css'

const Board = ({ size }) => {
  const squares = []

  for (let row = 0; row < ROWS_LENGTH; row++) {
    for (let col = 0; col < COLUMNS_LENGTH; col++) {
      const color =
        row % 2
          ? col % 2
            ? SECOND_COLOR
            : FIRST_COLOR
          : col % 2
          ? FIRST_COLOR
          : SECOND_COLOR

      squares.push(
        <Square size={size / 8} key={`${row}${col}`} color={color} />
      )
    }
  }

  return (
    <div style={{ width: size, height: size }} className={styles.board}>
      {squares}
    </div>
  )
}

Board.propTypes = {
  size: PropTypes.number
}

export default Board
