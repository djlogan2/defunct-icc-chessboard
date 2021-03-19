import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Board from './components/Board/Board'
import withWindowSize from './HOCs/withWindowSize'

import classes from './styles.module.css'
import Files from './components/Lines/Files'
import Ranks from './components/Lines/Ranks'
import BoardWrapper from './components/BoardWrapper/BoardWrapper'
import {
  BLACK_PLAYER_PERSPECTIVE,
  WHITE_PLAYER_PERSPECTIVE,
  BOARD_SIZE_RELATIVE,
  BOARD_SIZE_MARGIN
} from './constants/systemConstants'
import { getPiecesFromFen, parseRaf } from './utils/utils'

const ChessBoard = ({
  fen,
  raf,
  styles,
  movable,
  circles,
  arrows,
  onMove,
  pieceImages,
  perspective,
  windowWidth,
  windowHeight,
  boardSquares,
  smartMoves,
  smallSize,
  onUpdateCircles,
  onUpdateArrows,
  showLegalMoves
}) => {
  const currentElement = useRef(null)
  const [boardSize, updateBoardSize] = useState({ width: null, height: null })

  useEffect(() => {
    const height = currentElement?.current?.clientHeight
    const width = currentElement?.current?.clientWidth

    updateBoardSize({ width, height })
  }, [currentElement, windowWidth, windowHeight])

  const { ranksSide, filesSide, signatureSquares } = parseRaf(raf)

  const size = Math.min(boardSize.width, boardSize.height)
  const pieces = getPiecesFromFen(fen, pieceImages, perspective)

  return (
    <div
      ref={currentElement}
      className={classes.wrapper}
      style={styles?.wrapper}
    >
      {!!boardSize.width && !!boardSize.height && (
        <BoardWrapper size={size} boardWrapperStyle={styles?.boardWrapper}>
          <Board
            boardSquares={boardSquares}
            size={size * BOARD_SIZE_RELATIVE}
            styles={styles}
            pieces={pieces}
            perspective={perspective}
            movable={movable}
            circles={circles}
            arrows={arrows}
            handleMove={onMove}
            smartMoves={smartMoves}
            smallSize={smallSize}
            onUpdateCircles={onUpdateCircles}
            onUpdateArrows={onUpdateArrows}
            showLegalMoves={showLegalMoves}
            signatureSquares={signatureSquares}
          />
          {size * BOARD_SIZE_RELATIVE > smallSize && (
            <Fragment>
              <Files
                width={size * BOARD_SIZE_RELATIVE}
                height={size * BOARD_SIZE_MARGIN}
                side={filesSide}
                perspective={perspective}
                filesStyle={styles?.files}
              />
              <Ranks
                height={size * BOARD_SIZE_RELATIVE}
                width={size * BOARD_SIZE_MARGIN}
                side={ranksSide}
                perspective={perspective}
                ranksStyle={styles?.ranks}
              />
            </Fragment>
          )}
        </BoardWrapper>
      )}
    </div>
  )
}

ChessBoard.propTypes = {
  raf: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  perspective: PropTypes.oneOf([
    WHITE_PLAYER_PERSPECTIVE,
    BLACK_PLAYER_PERSPECTIVE
  ]).isRequired,
  fen: PropTypes.string.isRequired,
  styles: PropTypes.object,
  pieceImages: PropTypes.object.isRequired,
  boardSquares: PropTypes.object.isRequired,
  movable: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  showLegalMoves: PropTypes.bool.isRequired,
  circles: PropTypes.array,
  arrows: PropTypes.array,
  onUpdateCircles: PropTypes.func.isRequired,
  onUpdateArrows: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  smartMoves: PropTypes.bool,
  smallSize: PropTypes.number.isRequired
}

export default withWindowSize(ChessBoard)
