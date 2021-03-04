import React  from 'react'

import ChessBoard from 'chessboard'
import 'chessboard/dist/index.css'
import { arraysEqual } from './utils'

const Chess = require('chess.js')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.chess = new Chess()
    this.state = {
      legalmoves: this.getLegalMoves(),
      fen: this.chess.fen(),
      circles: [],
      arrows: []
    }
  }

  handleUpdateCircles = (circle) => {
    const { circles } = this.state;

    if (circles.includes(circle)) {
      const index = circles.indexOf(circle)
      circles.splice(index, 1)
    } else {
      circles.push(circle)
    }
    this.setState({ circles })
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

  handleMove(move) {
    this.chess.move(move[0] + move[1], { sloppy: true })
    this.setState({ legalmoves: this.getLegalMoves(), fen: this.chess.fen() })
  }

  handleUpdateArrows(arrow) {
    const { arrows } = this.state;

    let equalIndex
    const isExists = arrows.some((element, index) => {
      const isEqual = arraysEqual(element, arrow)

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
    const {fen, legalmoves, circles, arrows} = this.state;

    return (
      <ChessBoard
        ranksSide='right'
        filesSide='bottom'
        perspective='white'
        fen={fen}
        boardSquares={{
          light: { default: '#FFFFFF', active: '#9c9c9c' },
          dark: { default: '#1565c0', active: '#1255A1' }
        }}
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
        ranks={['1', '2', '3', '4', '5', '6', '7', '8']}
        files={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
        circleColor='#000000'
        arrowColor='#000000'
        movable={legalmoves}
        circles={circles}
        arrows={arrows}
        onUpdateCircles={circle => this.handleUpdateCircles(circle)}
        onUpdateArrows={arrow => this.handleUpdateArrows(arrow)}
        onMove={move => this.handleMove(move)}
        mode='game'
        smartMoves
        showLegalMoves
        smallSize={500}
        signatureSquares
      />
    )
  }
}

export default App
