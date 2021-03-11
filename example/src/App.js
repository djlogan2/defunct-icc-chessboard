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
    let { circles } = this.state;

    if (circles.includes(circle)) {
      circles = circles.filter(c => c.square === circle);
    } else {
      // DJL - This is what I want to be able to do.
      circles.push({square: circle, color: "red", width: 3});
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
    let { arrows } = this.state;

    arrows = arrows.filter(a => a.from === arrow[0] && a.to === arrow[1]);
    if(arrows.length === this.state.arrows.length) {
      // DJL - This is what I want to be able to do.
      arrows.push({from: arrow[0], to: arrow[1], color: "green", width: 3});
    }
    this.setState({ arrows: [...arrows] })
  }

  render() {
    const {fen, legalmoves, circles, arrows} = this.state;

    return (
      <ChessBoard
        ranksSide='right'
        filesSide='bottom'
        signatureSquares={false} // DJL If this is what I think it is, instead of having the above three, I would rather have one prop like:
        raf={where} // where is either an object or a string
                    // For example:
                    // {inside: true, vertical: "top", horizontal: "left"} (top, middle, bottom, left, middle, right)
                    // {inside: false, vertical: "top", horizontal: "bottom"} (top, bottom, left, right)
                    // or
                    // strings, like "tl", "tr", "bl", "br", "stm", "smm" ('s'=in square, 'm'=middle, 'm'=middle, etc.)
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
        ranks={['1', '2', '3', '4', '5', '6', '7', '8']} // DJL We really do not need these, ranks and files will always be in english letters. That's a world wide standard.
        files={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']} // DJL We really do not need these, ranks and files will always be in english letters. That's a world wide standard.
        circleColor='#000000' // DJL Get rid of this prop. Useless. See the handle function
        arrowColor='#000000'  // DJL Get rid of this prop. Useless. See the handle function
        movable={legalmoves}
        circles={circles} // DJL See the handle function
        arrows={arrows}   // DJL See the handle function
        onUpdateCircles={circle => this.handleUpdateCircles(circle)}
        onUpdateArrows={arrow => this.handleUpdateArrows(arrow)}
        onMove={move => this.handleMove(move)}
        mode='game' // DJL - What the heck is this? See comment in constants.js
        smartMoves={false} // DJL - This has to be controllable by a variable
        showLegalMoves={false} // DJL - This has to be controllable by a variable
        smallSize={500} // DJL I'm still not sure about this, but it sounds like a mobile thing
      />
    )
  }
}

export default App
