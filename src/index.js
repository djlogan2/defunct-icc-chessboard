import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Board from './components/Board/Board'
import withWindowSize from './HOCs/withWindowSize'

import Edit from './components/Edit/Edit'
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
import { FILES_ARRAY, RANKS_ARRAY } from './constants/boardConstants'

const ChessBoard = ({
  fen,
  raf,
  edit,
  styles,
  movable,
  circles,
  arrows,
  onMove,
  lastMove,
  showLastMove,
  pieceImages,
  perspective,
  windowWidth,
  windowHeight,
  boardSquares,
  smartMoves,
  smallSize,
  handleAdd,
  handleDelete,
  onUpdateCircles,
  onUpdateArrows,
  showLegalMoves,
  promotionPieces,
  accessibilityPieces
}) => {
  const currentElement = useRef(null)
  const [boardSize, updateBoardSize] = useState({ width: null, height: null })
  const [deletePiece, updateDeletePiece] = useState(Date.now())

  useEffect(() => {
    const height = currentElement?.current?.clientHeight
    const width = currentElement?.current?.clientWidth

    updateBoardSize({ width, height })
  }, [currentElement, windowWidth, windowHeight])

  const { ranksSide, filesSide, signatureSquares } = parseRaf(raf)

  const size = Math.min(boardSize.width, boardSize.height)
  const pieces = getPiecesFromFen(fen, pieceImages, perspective)

  const handleDragEnd = (event) => {
    if (event.currentTarget.tagName !== 'HTML' && edit) {
      let target
      if (event.clientX) {
        target = document.elementFromPoint(event.clientX, event.clientY)
      } else {
        target = document.elementFromPoint(
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY
        )
      }

      if (
        !target ||
        !target.id ||
        !FILES_ARRAY.includes(target.id[0]) ||
        !RANKS_ARRAY.includes(target.id[1])
      ) {
        updateDeletePiece(Date.now())
        handleDelete(event.target.id)
      }
    }
  }

  return (
    <div
      ref={currentElement}
      className={classes.wrapper}
      style={styles?.wrapper}
      onDragEnd={handleDragEnd}
      id='board-container'
    >
      {!!boardSize.width && !!boardSize.height && (
        <BoardWrapper size={size} boardWrapperStyle={styles?.boardWrapper}>
          <Board
            edit={edit}
            boardSquares={boardSquares}
            size={size * BOARD_SIZE_RELATIVE}
            styles={styles}
            pieces={pieces}
            perspective={perspective}
            movable={movable}
            circles={circles}
            arrows={arrows}
            handleMove={onMove}
            pieceImages={pieceImages}
            smartMoves={smartMoves}
            smallSize={smallSize}
            handleAdd={handleAdd}
            lastMove={lastMove}
            showLastMove={showLastMove}
            deletePiece={deletePiece}
            onUpdateCircles={onUpdateCircles}
            onUpdateArrows={onUpdateArrows}
            showLegalMoves={showLegalMoves}
            signatureSquares={signatureSquares}
            promotionPieces={promotionPieces}
            accessibilityPieces={accessibilityPieces}
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
  smallSize: PropTypes.number.isRequired,
  promotionPieces: PropTypes.array.isRequired,
  edit: PropTypes.object,
  handleAdd: PropTypes.func,
  handleDelete: PropTypes.func,
  accessibilityPieces: PropTypes.object.isRequired,
  showLastMove: PropTypes.bool,
  lastMove: PropTypes.object
}

export { Edit as PiecesSidebar }

export default withWindowSize(ChessBoard)
