import React from 'react'

import ChessBoard from 'chessboard'
import 'chessboard/dist/index.css'

const App = () => {
  return <ChessBoard ranksSide="right" filesSide="none" perspective="black"/>
};

export default App
