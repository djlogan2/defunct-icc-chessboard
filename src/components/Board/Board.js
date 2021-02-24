import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Square from '../Square/Square'

import classes from './board.module.css'

const Board = ({
  size,
  ranks,
  files,
  pieces,
  movable,
  boardStyle,
  boardSquares,
  circleColor
}) => {
  const squares = []
  const [activePiece, updateActivePiece] = useState(null)

  const handlePieceClick = (piece) => {
    updateActivePiece(piece)
  }

  for (let row = 0; row < files.length; row++) {
    for (let col = 0; col < ranks.length; col++) {
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
          handlePieceClick={handlePieceClick}
          circleColor={circleColor}
          piece={pieces[row][col]}
          size={size / 8}
          key={`${row}${col}`}
          pieceKey={movable[`${files[row]}${ranks[col]}`]}
          color={color}
          isLegal={false}
          circle={false}
          activePiece={activePiece}
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
