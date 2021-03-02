import React, {useState} from 'react'

import ChessBoard from 'chessboard'
import 'chessboard/dist/index.css'
import {arraysEqual} from "./utils";

const App = () => {
  const [circles, updateCircles] = useState([])
  const [arrows, updateArrows] = useState([])

  const handleUpdateCircles = (circle) => {
    if (circles.includes(circle)) {
      const index = circles.indexOf(circle)
      circles.splice(index, 1)

      updateCircles([...circles])
    } else {
      updateCircles([...circles, circle])
    }
  }

  const handleMove = (move) => {
    console.log(move)
  }

  const handleUpdateArrows = (arrow) => {
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
      updateArrows([...arrows])
    } else {
      updateArrows([...arrows, arrow])
    }
  }

  return (
    <ChessBoard
      ranksSide="right"
      filesSide="bottom"
      perspective="white"
      fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      boardSquares={{
        light: {default: "#FFFFFF", active: "#9c9c9c"},
        dark: {default: "#1565c0", active: "#1255A1"}
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
      circleColor="#000000"
      arrowColor="#000000"
      movable={{e2: ["e3", "e4"]}}
      circles={circles}
      arrows={arrows}
      onUpdateCircles={handleUpdateCircles}
      onUpdateArrows={handleUpdateArrows}
      onMove={handleMove}
      mode="game"
    />
  );
};

export default App
