import React from 'react'

import ChessBoard from 'chessboard'
import 'chessboard/dist/index.css'

const App = () => {
  return <ChessBoard ranksSide="right" filesSide="bottom" perspective="black"/>
};

export default App
