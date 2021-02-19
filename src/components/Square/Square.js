import React, {useState} from 'react'
import PropTypes from 'prop-types';

import { SECOND_COLOR } from '../../constants/systemConstants'
import Piece from "../Piece/Piece";
import Circle from "../Circle/Circle";

import styles from './square.module.css'

const Square = ({ color, size, circle=false, piece = {image: "https://cdn.pixabay.com/photo/2012/04/18/00/41/chess-36307_960_720.png", description: "bB"} }) => {
  const [isCircle, updateCircle] = useState(circle);

  const handleMouseUp = event => {
    if ('object' === typeof event && event.button === 2) {
      updateCircle(!isCircle);
    }
  };

  return (
    <button
      onMouseUp={handleMouseUp}
      onContextMenu={e => e.preventDefault()}
      className={color === SECOND_COLOR ? styles.odd : styles.even}
      style={{ width: size, height: size }}
    >
      {!!piece && <Piece pieceImage={piece.image} description={piece.description} size={size * 0.8} />}
      {!!isCircle && <Circle size={size * 0.8} />}
    </button>
  )
};

Square.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

export default Square
