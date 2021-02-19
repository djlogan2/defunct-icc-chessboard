import React from "react";
import PropTypes from 'prop-types';

import style from "./piece.module.css";

const Piece = ({pieceImage, description, size}) => {
  return (
    <img
      alt={description}
      src={pieceImage}
      className={style.piece}
      style={{width: size, height: "auto"}}
    />
  );
};

Piece.propTypes = {
  pieceImage: PropTypes.string,
  description: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

export default Piece;
