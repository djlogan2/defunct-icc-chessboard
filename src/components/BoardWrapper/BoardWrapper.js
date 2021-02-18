import React from 'react'

import styles from './boardWrapper.module.css'

const BoardWrapper = ({ size, children }) => (
  <div style={{ width: size, height: size }} className={styles.boardWrapper}>
    {children}
  </div>
);

export default BoardWrapper
