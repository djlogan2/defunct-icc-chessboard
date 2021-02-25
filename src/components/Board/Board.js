import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Square from '../Square/Square'

import classes from './board.module.css'
import {BLACK_PLAYER_PERSPECTIVE} from "../../constants/systemConstants";

const Board = ({
  size,
  ranks,
  files,
  pieces,
  movable,
  boardStyle,
  perspective,
  boardSquares,
  circleColor
}) => {
  const squares = []
  const [legalMoves, updateLegalMoves] = useState(null)

  const handlePieceClick = (piece) => {
    if (legalMoves === piece) {
      updateLegalMoves(null)
      return
    }

    updateLegalMoves(piece)
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

      const pieceCoordinates = perspective === BLACK_PLAYER_PERSPECTIVE ?
        `${files[(files.length - 1) - col]}${ranks[row]}` :
        `${files[col]}${ranks[(ranks.length - 1) - row]}`

      squares.push(
        <Square
          handlePieceClick={handlePieceClick}
          circleColor={circleColor}
          piece={pieces[row][col]}
          size={size / 8}
          key={`${row}${col}`}
          pieceName={pieceCoordinates}
          pieceDepends={movable[pieceCoordinates]}
          color={color}
          circle={false}
          legalMoves={legalMoves}
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
