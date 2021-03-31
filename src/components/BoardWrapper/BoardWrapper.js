import React from 'react'

import styles from './boardWrapper.module.css'

const BoardWrapper = ({ size, children, boardWrapperStyle }) => (
  <div
    id='board-wrapper'
    style={{ width: size, height: size, ...boardWrapperStyle }}
    className={styles.boardWrapper}
  >
    {children}
  </div>
)

export default BoardWrapper
