import React from 'react'
import PropTypes from 'prop-types'

import Square from '../Square/Square'

import classes from './board.module.css'

const Board = ({
  size,
  boardStyle,
  pieces,
  boardSquares,
  ranksLength,
  filesLength
}) => {
  const squares = []

  for (let row = 0; row < filesLength; row++) {
    for (let col = 0; col < ranksLength; col++) {
      const color =
        row % 2
          ? col % 2
            ? boardSquares.light
            : boardSquares.dark
          : col % 2
          ? boardSquares.dark
          : boardSquares.light

      squares.push(
        <Square
          piece={pieces[row][col]}
          size={size / 8}
          key={`${row}${col}`}
          color={color}
          isLegal={false}
          circle={false}
        />
      )
    }
  }

  return (
    <div
      style={{ width: size, height: size, ...boardStyle }}
      className={classes.board}
    >
      {squares}
    </div>
  )
}

Board.propTypes = {
  size: PropTypes.number,
  pieces: PropTypes.array.isRequired,
  perspective: PropTypes.string.isRequired
}

export default Board
