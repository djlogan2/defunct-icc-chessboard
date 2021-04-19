# chessboard

> chessboard library

[![NPM](https://img.shields.io/npm/v/chessboard.svg)](https://www.npmjs.com/package/chessboard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save chessboard
```

## Usage

```jsx
import React, { Component } from 'react'

import ChessBoard from 'chessboard'
import 'chessboard/dist/index.css'

const Chess = require('chess.js')

class App extends Component {
  constructor(props) {
    super(props)

    this.chess = new Chess()

    this.state = {
      legalMoves: this.getLegalMoves(),
      fen: this.chess.fen(),
      circles: [],
      arrows: [],
      smartMoves: true,
      showLegalMoves: true,
      smallSize: 500,
      showLastMove: true,
      lastMove: null
    }
  }

  getColorFromEvent = () => {
    return '#fafafa'
  }

  handleUpdateCircles = (circle) => {
    const { circles } = this.state

    circle.color = this.getColorFromEvent(circle.event)
    delete circle.event

    let equalIndex
    const isExists = circles.some((element, index) => {
      const isEqual = circle.piece === element.piece

      if (isEqual) {
        equalIndex = index
      }

      return isEqual
    })

    if (isExists) {
      circles.splice(equalIndex, 1)
    } else {
      circles.push(circle)
    }

    this.setState({ circles: [...circles] })
  }

  getLegalMoves = () => {
    const moves = {};
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach(rank => {
      for (let file = 1; file <= 8; file++) {
        const legal = this.chess.moves({ square: rank + file, verbose: true }).map(verbose => verbose.to)
        if (!!legal && !!legal.length)
          moves[rank + file] = legal
      }
    })
    return moves
  }

  handleMove = (move, promotion) => {
    const lastMove = this.chess.move(move[0] + move[1] + promotion, { sloppy: true })
    console.log(lastMove)
    this.setState({ legalMoves: this.getLegalMoves(), fen: this.chess.fen(), lastMove })
  }

  handleUpdateArrows = (arrow) => {
    const { arrows } = this.state

    arrow.color = this.getColorFromEvent(arrow.event)
    delete arrow.event

    let equalIndex
    const isExists = arrows.some((element, index) => {
      const isEqual = element.piece.to === arrow.piece.to && element.piece.from === arrow.piece.from

      if (isEqual) {
        equalIndex = index
      }

      return isEqual
    })

    if (isExists) {
      arrows.splice(equalIndex, 1)
    } else {
      arrows.push(arrow)
    }

    this.setState({ arrows: [...arrows] })
  }

  render() {
    const {
      fen,
      legalMoves,
      circles,
      arrows,
      smartMoves,
      showLegalMoves,
      smallSize,
      lastMove,
      showLastMove
    } = this.state

    return (
      <ChessBoard
        raf={{ inside: true, vertical: 'bottom', horizontal: 'right' }}
        perspective='white'
        fen={fen}
        boardSquares={{
          light: { default: '#FFFFFF', active: '#9c9c9c' },
          dark: { default: '#1565c0', active: '#1255A1' }
        }}
        showLastMove={showLastMove}
        lastMove={lastMove}
        pieceImages={{
          bB: 'static/images/defaultPieces/bB.png',
          bK: 'static/images/defaultPieces/bK.png',
          bN: 'static/images/defaultPieces/bN.png',
          bP: 'static/images/defaultPieces/bP.png',
          bQ: 'static/images/defaultPieces/bQ.png',
          bR: 'static/images/defaultPieces/bR.png',
          wB: 'static/images/defaultPieces/wB.png',
          wK: 'static/images/defaultPieces/wK.png',
          wN: 'static/images/defaultPieces/wN.png',
          wP: 'static/images/defaultPieces/wP.png',
          wQ: 'static/images/defaultPieces/wQ.png',
          wR: 'static/images/defaultPieces/wR.png'
        }}
        styles={{
          wrapper: {
            backgroundColor: '#292929'
          },
          files: {
            color: 'white'
          },
          ranks: {
            color: 'white'
          },
          promotion: {
            backgroundColor: '#a8a8a8'
          },
          lastMove: '5px solid #3CFF33'
        }}
        movable={legalMoves}
        circles={circles}
        arrows={arrows}
        onUpdateCircles={circle => this.handleUpdateCircles(circle)}
        onUpdateArrows={arrow => this.handleUpdateArrows(arrow)}
        onMove={(move, promotion) => this.handleMove(move, promotion)}
        smartMoves={smartMoves}
        showLegalMoves={showLegalMoves}
        smallSize={smallSize}
        promotionPieces={['q', 'n', 'b', 'r']}
        accessibilityPieces={{
          bP: 'Black pawn',
          bR: 'Black rook',
          bN: 'Black knight',
          bB: 'Black bishop',
          bQ: 'Black queen',
          bK: 'Black king',
          wP: 'White pawn',
          wR: 'White rook',
          wN: 'White knight',
          wB: 'White bishop',
          wQ: 'White queen',
          wK: 'White king',
          emptySquare: 'Empty square',
          legalMoves: 'Legal moves: '
        }}
      />
    )
  }
}

export default App
```

## License

MIT © [djlogan2](https://github.com/djlogan2)
