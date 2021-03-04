import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Square from '../Square/Square'

import classes from './board.module.css'
import { BLACK_PLAYER_PERSPECTIVE } from '../../constants/systemConstants'
import { generateArrowCoordinates } from '../../utils/utils'

const Board = ({
  size,
  mode,
  ranks,
  files,
  pieces,
  arrows,
  circles,
  movable,
  boardStyle,
  perspective,
  boardSquares,
  circleColor,
  arrowColor,
  handleMove,
  smartMoves,
  onUpdateArrows,
  onUpdateCircles,
  showLegalMoves
}) => {
  const squares = []
  const [currentPiece, updateCurrentPiece] = useState(null)
  const [legalMoves, updateLegalMoves] = useState(null)
  const [squareMouseDown, updateSquareMouseDown] = useState(null)
  const [squareMouseUp, updateSquareMouseUp] = useState(null)

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const arrowsCoordinates = generateArrowCoordinates(
      arrows,
      size,
      files,
      ranks,
      perspective
    )

    context.clearRect(0, 0, canvas.width, canvas.height)

    arrowsCoordinates.forEach((arrow) => {
      const headlen = 20 // length of head in pixels
      const dx = arrow.to.x - arrow.from.x
      const dy = arrow.to.y - arrow.from.y
      const angle = Math.atan2(dy, dx)

      context.beginPath()
      context.moveTo(arrow.from.x, arrow.from.y)
      context.lineTo(arrow.to.x, arrow.to.y)

      context.lineTo(
        arrow.to.x - headlen * Math.cos(angle - Math.PI / 6),
        arrow.to.y - headlen * Math.sin(angle - Math.PI / 6)
      )
      context.moveTo(arrow.to.x, arrow.to.y)
      context.lineTo(
        arrow.to.x - headlen * Math.cos(angle + Math.PI / 6),
        arrow.to.y - headlen * Math.sin(angle + Math.PI / 6)
      )
      context.strokeStyle = arrowColor
      context.lineWidth = 5
      context.stroke()
    })
  }, [arrows])

  useEffect(() => {
    if (!squareMouseDown || !squareMouseUp) {
      return
    }

    if (squareMouseDown !== squareMouseUp) {
      onUpdateArrows([squareMouseDown, squareMouseUp])
    } else {
      onUpdateCircles(squareMouseUp)
    }

    updateSquareMouseDown(null)
    updateSquareMouseUp(null)
  }, [squareMouseDown, squareMouseUp])

  const handlePieceClick = (piece) => {
    if (currentPiece === piece) {
      updateLegalMoves(null)
    } else if (legalMoves && legalMoves.includes(piece)) {
      handleMove([currentPiece, piece])
      updateLegalMoves(null)
    } else {
      if (typeof movable === 'function') {
        const moves = movable(piece)
        if (smartMoves && moves && moves.length === 1) {
          handleMove([piece, moves[0]])
        } else {
          updateLegalMoves(movable(piece))
        }
      } else if (typeof movable === 'object') {
        const moves = movable[piece]
        if (smartMoves && moves && moves.length === 1) {
          handleMove([piece, moves[0]])
        } else {
          updateLegalMoves(movable[piece])
        }
      }
    }

    if (currentPiece === piece) {
      updateCurrentPiece(null)
    } else {
      updateCurrentPiece(piece)
    }
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

      const pieceCoordinates =
        perspective === BLACK_PLAYER_PERSPECTIVE
          ? `${files[files.length - 1 - col]}${ranks[row]}`
          : `${files[col]}${ranks[ranks.length - 1 - row]}`

      const haveCircle = circles && circles.includes(pieceCoordinates)

      squares.push(
        <Square
          mode={mode}
          handlePieceClick={handlePieceClick}
          circleColor={circleColor}
          piece={pieces[row][col]}
          size={size / 8}
          key={`${row}${col}`}
          pieceName={pieceCoordinates}
          currentPiece={currentPiece}
          color={color}
          circle={haveCircle}
          legalMoves={legalMoves}
          showLegalMoves={showLegalMoves}
          updateSquareMouseDown={updateSquareMouseDown}
          updateSquareMouseUp={updateSquareMouseUp}
        />
      )
    }
  }

  return (
    <div
      style={{ width: size, height: size, ...boardStyle }}
      className={classes.board}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{
          position: 'absolute',
          zIndex: 999,
          pointerEvents: 'none'
        }}
      />
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
