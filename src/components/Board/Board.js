import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Square from '../Square/Square'

import classes from './board.module.css'
import { BLACK_PLAYER_PERSPECTIVE } from '../../constants/systemConstants'
import {
  generateArrowCoordinates,
  generateCircleCoordinates
} from '../../utils/utils'

const Board = ({
  size,
  ranks,
  files,
  pieces,
  arrows,
  circles,
  movable,
  smallSize,
  boardStyle,
  perspective,
  boardSquares,
  arrowColors,
  handleMove,
  smartMoves,
  signatureSquares,
  onUpdateArrows,
  onUpdateCircles,
  showLegalMoves
}) => {
  const squares = []
  const [currentPiece, updateCurrentPiece] = useState(null)
  const [legalMoves, updateLegalMoves] = useState(null)
  const [squareMouseDown, updateSquareMouseDown] = useState(null)
  const [squareMouseUp, updateSquareMouseUp] = useState(null)
  const [dataTransfer, updateDataTransfer] = useState(null)

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

    const circlesCoordinates = generateCircleCoordinates(
      circles,
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

      context.moveTo(
        arrow.to.x - headlen * Math.cos(angle - Math.PI / 6),
        arrow.to.y - headlen * Math.sin(angle - Math.PI / 6)
      )

      context.lineTo(arrow.to.x, arrow.to.y)

      context.lineTo(
        arrow.to.x - headlen * Math.cos(angle + Math.PI / 6),
        arrow.to.y - headlen * Math.sin(angle + Math.PI / 6)
      )

      context.strokeStyle = arrow.color
      context.lineWidth = 5
      context.stroke()
    })

    circlesCoordinates.forEach((circle) => {
      context.beginPath()

      context.strokeStyle = circle.color
      context.lineWidth = 5

      context.arc(
        circle.square.x,
        circle.square.y,
        circle.radius,
        0,
        Math.PI * 2
      )

      context.stroke()
    })
  }, [arrows, circles])

  useEffect(() => {
    if (
      !squareMouseDown ||
      !squareMouseUp ||
      !squareMouseDown.piece ||
      !squareMouseDown.color
    ) {
      return
    }

    if (squareMouseDown?.piece !== squareMouseUp) {
      onUpdateArrows([
        squareMouseDown.piece,
        squareMouseUp,
        squareMouseDown.color
      ])
    } else {
      onUpdateCircles(squareMouseDown)
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

      squares.push(
        <Square
          handlePieceClick={handlePieceClick}
          piece={pieces[row][col]}
          size={size / 8}
          key={`${row}${col}`}
          pieceName={pieceCoordinates}
          currentPiece={currentPiece}
          color={color}
          dataTransfer={dataTransfer}
          updateDataTransfer={updateDataTransfer}
          legalMoves={legalMoves}
          arrowColors={arrowColors}
          smallSize={smallSize / 8}
          signatureSquares={signatureSquares}
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
