import React, { Component }  from 'react'

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
      smartMoves: false,
      showLegalMoves: false,
      smallSize: 500
    }
  }

  handleUpdateCircles = (circle) => {
    // DJL I still want this: color: "#123456" width: 10 -- for EACH circle
    const circles = this.state.circles.filter(c => c.square === circle);
    if(circles.length === this.state.circles.length)
      circles.push({square: circle, color: "red", width: 3});
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

  handleMove = (move) => {
    this.chess.move(move[0] + move[1], { sloppy: true })
    this.setState({ legalMoves: this.getLegalMoves(), fen: this.chess.fen() })
  }

  handleUpdateArrows(arrow) {
    // DJL I still want this: color: "#123456" width: 10 -- for EACH arrow
    const arrows = this.state.arrows.filter(a => a.from === arrow[0] && a.to === arrow[1]);
    if(arrows.length === this.state.arrows.length)
      arrows.push({from: arrow[0], to: arrow[1], color: "green", width: 3});
    this.setState({arrows: arrows});
  }

  render() {
    const {fen, legalMoves, circles, arrows, smartMoves, showLegalMoves, smallSize} = this.state;

    return (
      <ChessBoard
        raf={{ inside: true, vertical: 'bottom', horizontal: 'right' }} // where is either an object or a string
                    // For example:
                    // {inside: true, vertical: "top", horizontal: "left"} (top, middle, bottom, left, middle, right)
                    // {inside: false, vertical: "top", horizontal: "bottom"} (top, bottom, left, right)
                    // or
                    // strings, like "tl", "tr", "bl", "br", "stm", "smm" ('s'=in square, 'm'=middle, 'm'=middle, etc.)
        perspective='white'
        fen={fen}
        boardSquares={{ // DJL Have you tested square images?
          light: { default: '#FFFFFF', active: '#9c9c9c' },
          dark: { default: '#1565c0', active: '#1255A1' }
        }}
        // circleColors={{      // DJL Still want these removed
        //   red: '#FF5733',
        //   yellow: '#F3FF33',
        //   green: '#3CFF33'
        // }}
        // arrowColors={{       // DJL Still want these removed
        //   red: '#FF5733',
        //   yellow: '#F3FF33',
        //   green: '#3CFF33'
        // }}
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
        // ranks={['1', '2', '3', '4', '5', '6', '7', '8']} DJL Still do not need these
        // files={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']} DJL Still do not need these
        movable={legalMoves}
        circles={circles}
        arrows={arrows}
        onUpdateCircles={circle => this.handleUpdateCircles(circle)}
        onUpdateArrows={arrow => this.handleUpdateArrows(arrow)}
        onMove={move => this.handleMove(move)}
        smartMoves={smartMoves}
        showLegalMoves={showLegalMoves}
        smallSize={smallSize}
      />
    )
  }
}

export default App
