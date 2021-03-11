import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Board from './components/Board/Board'
import withWindowSize from './HOCs/withWindowSize'

import classes from './styles.module.css'
import Files from './components/Lines/Files'
import Ranks from './components/Lines/Ranks'
import BoardWrapper from './components/BoardWrapper/BoardWrapper'
import {
  FILES_BOTTOM_SIDE,
  FILES_DISABLED,
  FILES_TOP_SIDE,
  RANKS_DISABLED,
  RANKS_LEFT_SIDE,
  RANKS_RIGHT_SIDE
} from './constants/boardConstants'
import {
  BLACK_PLAYER_PERSPECTIVE,
  WHITE_PLAYER_PERSPECTIVE,
  MODE_EDIT,
  MODE_EXAMINE,
  MODE_GAME,
  BOARD_SIZE_RELATIVE,
  BOARD_SIZE_MARGIN
} from './constants/systemConstants'
import { getPiecesFromFen } from './utils/utils'

const ChessBoard = ({
  fen,
  mode,
  ranks,
  files,
  styles,
  movable,
  circles,
  arrows,
  onMove,
  ranksSide,
  filesSide,
  pieceImages,
  perspective,
  windowWidth,
  windowHeight,
  boardSquares,
  arrowColors,
  circleColors,
  smartMoves,
  smallSize,
  signatureSquares,
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
            mode={mode}
            ranks={ranks}
            files={files}
            boardSquares={boardSquares}
            size={size * BOARD_SIZE_RELATIVE}
            styles={styles}
            pieces={pieces}
            perspective={perspective}
            arrowColors={arrowColors}
            circleColors={circleColors}
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
                files={files}
                width={size * BOARD_SIZE_RELATIVE}
                height={size * BOARD_SIZE_MARGIN}
                side={filesSide}
                perspective={perspective}
                filesStyle={styles?.files}
              />
              <Ranks
                ranks={ranks}
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
  ranks: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  ranksSide: PropTypes.oneOf([
    RANKS_RIGHT_SIDE,
    RANKS_LEFT_SIDE,
    RANKS_DISABLED
  ]).isRequired,
  filesSide: PropTypes.oneOf([
    FILES_BOTTOM_SIDE,
    FILES_TOP_SIDE,
    FILES_DISABLED
  ]).isRequired,
  perspective: PropTypes.oneOf([
    WHITE_PLAYER_PERSPECTIVE,
    BLACK_PLAYER_PERSPECTIVE
  ]).isRequired,
  fen: PropTypes.string.isRequired,
  styles: PropTypes.object,
  pieceImages: PropTypes.object.isRequired,
  boardSquares: PropTypes.object.isRequired,
  circleColors: PropTypes.object.isRequired,
  arrowColors: PropTypes.object.isRequired,
  movable: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  showLegalMoves: PropTypes.bool.isRequired,
  circles: PropTypes.array,
  arrows: PropTypes.array,
  mode: PropTypes.oneOf([MODE_GAME, MODE_EXAMINE, MODE_EDIT]).isRequired,
  onUpdateCircles: PropTypes.func.isRequired,
  onUpdateArrows: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  smartMoves: PropTypes.bool,
  smallSize: PropTypes.number.isRequired,
  signatureSquares: PropTypes.bool
}

export default withWindowSize(ChessBoard)
