import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Promotion from '../Promotion/Promotion'

import Square from '../Square/Square'

import classes from './board.module.css'
import { BLACK_PLAYER_PERSPECTIVE } from '../../constants/systemConstants'
import {
  generateArrowCoordinates,
  generateCircleCoordinates,
  getPieceNameFromCoordinates
} from '../../utils/utils'
import { FILES_ARRAY, RANKS_ARRAY } from '../../constants/boardConstants'

const Board = ({
                 size,
                 pieces,
                 styles,
                 arrows,
                 circles,
                 movable,
                 smallSize,
                 boardStyle,
                 perspective,
                 boardSquares,
                 handleMove,
                 smartMoves,
                 signatureSquares,
                 onUpdateArrows,
                 onUpdateCircles,
                 showLegalMoves,
                 promotionPieces,
                 pieceImages
               }) => {
  const squares = []
  const [currentPiece, updateCurrentPiece] = useState(null)
  const [legalMoves, updateLegalMoves] = useState(null)
  const [squareMouseDown, updateSquareMouseDown] = useState(null)
  const [squareMouseUp, updateSquareMouseUp] = useState(null)
  const [dataTransfer, updateDataTransfer] = useState(null)
  const [promotion, updatePromotion] = useState(false)

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const arrowsCoordinates = generateArrowCoordinates(
      arrows,
      size,
      FILES_ARRAY,
      RANKS_ARRAY,
      perspective
    )

    const circlesCoordinates = generateCircleCoordinates(
      circles,
      size,
      FILES_ARRAY,
      RANKS_ARRAY,
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
      !squareMouseDown.event
    ) {
      return
    }

    if (squareMouseDown?.piece !== squareMouseUp) {
      onUpdateArrows({
        event: squareMouseDown.event,
        piece: { from: squareMouseDown.piece, to: squareMouseUp }
      })
    } else {
      onUpdateCircles(squareMouseDown)
    }

    updateSquareMouseDown(null)
    updateSquareMouseUp(null)
  }, [squareMouseDown, squareMouseUp])

  const handlePromotion = (chosenPiece) => {
    handleMove([promotion.prevPiece, promotion.piece], chosenPiece)
    updatePromotion(null)
    updateCurrentPiece(null)
  }

  const handlePieceMove = (prevPiece, piece) => {
    const { row, col, pieceName } = getPieceNameFromCoordinates(pieces, perspective, prevPiece)

    if (
      pieceName &&
      pieceName[1] === 'P' &&
      (piece[1] === RANKS_ARRAY[0] ||
        piece[1] === RANKS_ARRAY[RANKS_ARRAY.length - 1])
      && promotionPieces.length > 1
    ) {
      updatePromotion({ prevPiece, piece, color: pieceName[0], coordinates: { row, col } })
    } else if (
      pieceName &&
      pieceName[1] === 'P' &&
      (piece[1] === RANKS_ARRAY[0] ||
        piece[1] === RANKS_ARRAY[RANKS_ARRAY.length - 1])
      && promotionPieces.length === 1
    ) {
      handleMove([prevPiece, piece], promotionPieces[0])
      updateCurrentPiece(null)
    } else {
      handleMove([prevPiece, piece])
      updateCurrentPiece(null)
    }
  }

  const handlePieceClick = (piece) => {
    if (currentPiece === piece) {
      updateLegalMoves(null)
    } else if (legalMoves && legalMoves.includes(piece)) {
      handlePieceMove(currentPiece, piece)
      updateLegalMoves(null)

      return
    } else {
      if (typeof movable === 'function') {
        const moves = movable(piece)
        if (smartMoves && moves && moves.length === 1) {
          handlePieceMove(currentPiece, moves[0])

          return
        } else {
          updateLegalMoves(movable(piece))
        }
      } else if (typeof movable === 'object') {
        const moves = movable[piece]
        if (smartMoves && moves && moves.length === 1) {
          handlePieceMove(currentPiece, moves[0])

          return
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

  for (let row = 0; row < FILES_ARRAY.length; row++) {
    for (let col = 0; col < RANKS_ARRAY.length; col++) {
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
          ? `${FILES_ARRAY[FILES_ARRAY.length - 1 - col]}${RANKS_ARRAY[row]}`
          : `${FILES_ARRAY[col]}${RANKS_ARRAY[RANKS_ARRAY.length - 1 - row]}`

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
      {!!promotion && (
        <Promotion
          perspective={perspective}
          size={size / 8}
          promotionPieces={promotionPieces}
          pieceImages={pieceImages}
          currentPiece={promotion}
          onPromotion={handlePromotion}
          styles={styles?.promotion}
        />
      )}
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
