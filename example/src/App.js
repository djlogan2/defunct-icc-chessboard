import React from 'react'

import ChessBoard from 'chessboard'
import 'chessboard/dist/index.css'

const App = () => {
  return <ChessBoard ranksSide="right" filesSide="bottom" perspective="black" fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" />
};

export default App
