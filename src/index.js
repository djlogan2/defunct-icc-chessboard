import React, { useEffect, useRef, useState } from 'react'
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
  STATUS_EDIT,
  STATUS_EXAMINE,
  STATUS_GAME,
  WHITE_PLAYER_PERSPECTIVE
} from './constants/systemConstants'
import { getPiecesFromFen } from './utils/utils'

const ChessBoard = ({
  fen,
  ranks,
  files,
  styles,
  movable,
  circles,
  arrows,
  ranksSide,
  filesSide,
  pieceImages,
  perspective,
  windowWidth,
  windowHeight,
  boardSquares,
  arrowColor,
  circleColor,
  onUpdateCircles,
  onUpdateArrows
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
            ranks={ranks}
            files={files}
            boardSquares={boardSquares}
            size={size * 0.85}
            styles={styles}
            pieces={pieces}
            perspective={perspective}
            arrowColor={arrowColor}
            circleColor={circleColor}
            movable={movable}
            circles={circles}
            arrows={arrows}
            onUpdateCircles={onUpdateCircles}
            onUpdateArrows={onUpdateArrows}
          />
          <Files
            files={files}
            width={size * 0.85}
            side={filesSide}
            perspective={perspective}
            filesStyle={styles?.files}
          />
          <Ranks
            ranks={ranks}
            height={size * 0.85}
            side={ranksSide}
            perspective={perspective}
            ranksStyle={styles?.ranks}
          />
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
  circleColor: PropTypes.string.isRequired,
  arrowColor: PropTypes.string.isRequired,
  movable: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  circles: PropTypes.array,
  arrows: PropTypes.array,
  status: PropTypes.oneOf([STATUS_GAME, STATUS_EXAMINE, STATUS_EDIT])
    .isRequired,
  onUpdateCircles: PropTypes.func.isRequired,
  onUpdateArrows: PropTypes.func.isRequired
}

export default withWindowSize(ChessBoard)
