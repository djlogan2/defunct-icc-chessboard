import React from 'react'

import ChessBoard from 'chessboard'
import 'chessboard/dist/index.css'

const App = () => {
  return (
    <ChessBoard
      ranksSide="right"
      filesSide="bottom"
      perspective="black"
      fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
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
    />
  );
};

export default App
