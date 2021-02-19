import React from 'react'
import PropTypes from 'prop-types'
import LegalMoveDot from './LegalMoveDot'
import SquareOrCircle from './SquareOrCircle'
import RankAndFileIndicator from './RankAndFileIndicator'
import Piece from './Piece'

// OK, firstly, no images, no pieces, no colors, no styles, no CSS
// in this library. Since we are supposed to be building this to allow
// total customization, my idea is that at the very top level, we pass in
// an object that contains EVERYTHING EVERY component needs to handle itself.
// These classes will do things like shrink, enlarge, crop, center, whatever it
// needs to do, but it will NOT decide what things look like. That is all passed in.
//
// I'm thinking like this:
// <Board styles={styles_object} />
//   Then every component, all the way down, gets passed the same things. See below.
//
// Nextly, you can see how I am thinking about putting this together. This square, for example,
// builds everything in a very specific stack:
// The square itself first
// rank and file indicator
// The piece
// The circle or square
// The legal move dot

// Each one of these components should be easily creatable and easily testable
// Once we get here, this should be easy to put all kinds of things into the square with
// simple props!

// Nextly, I do not think the square itself has ANYTHING to do with mouse events. No reason
// in any way, shape or form for the square to do anything. It must simply pass that event up
// to the caller, probably with it's square name (like "c4", or "[3,4]" or whatever we decide),
// and let the higher level components, like a board (who is the only guy with the rules engine,
// not to mention the only guy who knows if it's played, who's move it is, etc.) decide what to
// or not to do.

// I think we need "enter", "leave", "down" and "up" mouse events passed up.
// From here, exactly how to make sure a div is a square, images are sized right,
// correct colors are applied, components are rendered in a specific order on the screen,
// etc. is all yours!

// Let me know if you do not like this in any way, or if you have any questions.

// Oh, I also added eslint and prettier. Let's keep the code clean, shall we?
// Also, please make sure you write whatever relevant code doc is required for use as a
// public library. When it's internal use only, I don't care so much, but since we do intend
// for other people to use this, it would be nice to have that internal jsdoc so that future
// users of this library can get the same help we get from the libraries we use.

export default class Square extends React.Component {
  render() {
    const {
      styles,
      size,
      piece,
      pieceColor,
      showLegalMoveDot,
      squareOrCircle,
      rankAndFileIndicator
    } = this.props
    return (
      <div
        style={{
          width: size,
          height: size,
          color: 'red'
        }}
        mouseenter={() => this.onmouseenter()}
        mouseleave={() => this.onmouseleave()}
      >
        {!!rankAndFileIndicator && (
          <RankAndFileIndicator styles={styles} where={rankAndFileIndicator} />
        )}
        {!!piece && <Piece styles={styles} which={piece} color={pieceColor} />}
        {!!squareOrCircle && (
          <SquareOrCircle
            styles={styles}
            type={squareOrCircle.type}
            color={squareOrCircle.color}
            width={squareOrCircle.width}
          />
        )}
        {!!showLegalMoveDot && <LegalMoveDot styles={styles} />}
      </div>
    )
  }

  static propTypes = {
    /** The object with the various style/image/css/vector/color/etc requirements for squares, colors, pieces, legal move dots, etc. etc. etc. */
    styles: PropTypes.object.isRequired,

    /** The width of the side of the square */
    size: PropTypes.number.isRequired,
    /** A black(dark) or white(light) square */
    squareColor: PropTypes.oneOf(['b', 'w']).isRequired,

    /** The piece on the square, if there is one */
    piece: PropTypes.oneOf(['r', 'n', 'b', 'q', 'k', 'p']),
    piececolor: PropTypes.oneOf(['b', 'w']),

    /** The legal move dot, if there is one */
    showLegalMoveDot: PropTypes.bool,

    /** A square or a circle, if there is one */
    squareOrCircle: PropTypes.shape({
      type: PropTypes.oneOf(['circle', 'square']).isRequired,
      color: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    }),

    /** Rank and file indicator if there is one */
    rankAndFileIndicator: PropTypes.oneOf([
      'tl',
      'tm',
      'tr',
      'ml',
      'mm',
      'mr',
      'bl',
      'bm',
      'br'
    ]),

    /** Fired when the mouse enters */
    onMouseIn: PropTypes.func,
    /** Fired when the mouse leaves */
    onMouseOut: PropTypes.func,
    /** Fired when the mouse button is pressed */
    onMousedown: PropTypes.func,
    /** Fired when the mouse button is released */
    onMouseUp: PropTypes.func
  }
}
