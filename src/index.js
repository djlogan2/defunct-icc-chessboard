import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Board from './components/Board/Board'
import withWindowSize from './HOCs/withWindowSize'

import styles from './styles.module.css'
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
  WHITE_PLAYER_PERSPECTIVE
} from './constants/systemConstants'

const ChessBoard = ({
  windowWidth,
  windowHeight,
  ranksSide,
  filesSide,
  perspective
}) => {
  const currentElement = useRef(null)
  const [boardSize, updateBoardSize] = useState({ width: null, height: null })

  useEffect(() => {
    const height = currentElement?.current?.clientHeight
    const width = currentElement?.current?.clientWidth

    updateBoardSize({ width, height })
  }, [currentElement, windowWidth, windowHeight])

  const size = Math.min(boardSize.width, boardSize.height)
  return (
    <div ref={currentElement} className={styles.wrapper}>
      {!!boardSize.width && !!boardSize.height && (
        <BoardWrapper size={size}>
          <Board size={size * 0.9} />
          <Files
            width={size * 0.9}
            side={filesSide}
            perspective={perspective}
          />
          <Ranks
            height={size * 0.9}
            side={ranksSide}
            perspective={perspective}
          />
        </BoardWrapper>
      )}
    </div>
  )
}

ChessBoard.propTypes = {
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
  ]).isRequired
}

export default withWindowSize(ChessBoard)
