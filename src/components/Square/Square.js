import React from 'react'
import styles from './square.module.css'
import { SECOND_COLOR } from '../../constants/systemConstants'

const Square = ({ color, size }) => {
  return (
    <button
      disabled
      className={color === SECOND_COLOR ? styles.odd : styles.even}
      style={{ width: size, height: size }}
    />
  )
};

export default Square
