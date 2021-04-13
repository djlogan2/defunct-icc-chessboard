import {
  FILES_ARRAY,
  PIECES_MAP,
  RANKS_ARRAY
} from '../constants/boardConstants'
import {
  BLACK_PLAYER_PERSPECTIVE,
  PROMOTION_OFFSET_RELATIVE,
  sidesMapping,
  WHITE_PLAYER_PERSPECTIVE
} from '../constants/systemConstants'

export const checkIsOdd = (value) => {
  return value % 2 === 1
}

export const getStep = (event) => {
  if (event.key === 'ArrowUp') {
    return -FILES_ARRAY.length
  }

  if (event.key === 'ArrowDown') {
    return FILES_ARRAY.length
  }

  if (event.key === 'ArrowLeft') {
    return -1
  }

  if (event.key === 'ArrowRight') {
    return 1
  }
  if (event.key === 'Tab') {
    return 1
  }
}

export const parseRaf = (raf) => {
  if (typeof raf === 'object') {
    const { inside, vertical, horizontal } = raf

    return {
      ranksSide: horizontal,
      filesSide: vertical,
      signatureSquares: inside
    }
  }

  if (typeof raf === 'string') {
    if (raf[0] === 's') {
      return {
        signatureSquares: true,
        filesSide: sidesMapping[raf[1]],
        ranksSide: sidesMapping[raf[2]]
      }
    } else {
      return {
        signatureSquares: false,
        filesSide: sidesMapping[raf[0]],
        ranksSide: sidesMapping[raf[3]]
      }
    }
  }

  console.error('Incorrect type of raf property')
}

export const generateArrowCoordinates = (
  arrows,
  size,
  files,
  ranks,
  perspective
) => {
  return arrows.reduce((acc, arrow) => {
    const squareSize = size / 8
    const currentArrow = {}

    const from = arrow.piece.from
    const to = arrow.piece.to
    const color = arrow.color

    const fromSizeX =
      squareSize / 2 +
      (perspective === WHITE_PLAYER_PERSPECTIVE
        ? files.indexOf(from[0]) * squareSize
        : (files.length - 1 - files.indexOf(from[0])) * squareSize)
    const fromSizeY =
      squareSize / 2 +
      (perspective === BLACK_PLAYER_PERSPECTIVE
        ? ranks.indexOf(from[1]) * squareSize
        : (ranks.length - 1 - ranks.indexOf(from[1])) * squareSize)

    const toSizeX =
      squareSize / 2 +
      (perspective === WHITE_PLAYER_PERSPECTIVE
        ? files.indexOf(to[0]) * squareSize
        : (files.length - 1 - files.indexOf(to[0])) * squareSize)
    const toSizeY =
      squareSize / 2 +
      (perspective === BLACK_PLAYER_PERSPECTIVE
        ? ranks.indexOf(to[1]) * squareSize
        : (ranks.length - 1 - ranks.indexOf(to[1])) * squareSize)

    currentArrow.from = { x: fromSizeX, y: fromSizeY }
    currentArrow.to = { x: toSizeX, y: toSizeY }
    currentArrow.color = color

    acc.push(currentArrow)
    return acc
  }, [])
}

export const generateCircleCoordinates = (
  circles,
  size,
  files,
  ranks,
  perspective
) => {
  return circles.reduce((acc, circle) => {
    const squareSize = size / files.length
    const currentCircle = {}

    const { color, piece } = circle

    const sizeX =
      squareSize / 2 +
      (perspective === WHITE_PLAYER_PERSPECTIVE
        ? files.indexOf(piece[0]) * squareSize
        : (files.length - 1 - files.indexOf(piece[0])) * squareSize)
    const sizeY =
      squareSize / 2 +
      (perspective === BLACK_PLAYER_PERSPECTIVE
        ? ranks.indexOf(piece[1]) * squareSize
        : (ranks.length - 1 - ranks.indexOf(piece[1])) * squareSize)

    currentCircle.square = { x: sizeX, y: sizeY }
    currentCircle.radius = squareSize * 0.4
    currentCircle.color = color

    acc.push(currentCircle)
    return acc
  }, [])
}

export const getPiecesFromFen = (fen, pieceImages, perspective) => {
  const pieces = []

  const fenArray = fen.split(' ')
  const ranks = fenArray[0].split('/')

  ranks.forEach((rank) => {
    perspective === BLACK_PLAYER_PERSPECTIVE
      ? pieces.unshift([])
      : pieces.push([])

    rank.split('').forEach((element) => {
      const addNumber =
        perspective === BLACK_PLAYER_PERSPECTIVE ? 0 : pieces.length - 1

      if (!isNaN(element)) {
        for (let i = 0; i < Number(element); i++) {
          perspective === BLACK_PLAYER_PERSPECTIVE
            ? pieces[addNumber].unshift({})
            : pieces[addNumber].push({})
        }
      } else {
        perspective === BLACK_PLAYER_PERSPECTIVE
          ? pieces[addNumber].unshift({
              color: PIECES_MAP[element]?.color,
              image: pieceImages[PIECES_MAP[element]?.code],
              description: PIECES_MAP[element]?.code
            })
          : pieces[addNumber].push({
              color: PIECES_MAP[element]?.color,
              image: pieceImages[PIECES_MAP[element]?.code],
              description: PIECES_MAP[element]?.code
            })
      }
    })
  })

  return pieces
}

export const getPieceNameFromCoordinates = (
  pieces,
  perspective,
  coordinates,
  prevCoordinates
) => {
  const row =
    perspective === WHITE_PLAYER_PERSPECTIVE
      ? RANKS_ARRAY.length - Number(coordinates[1])
      : Number(coordinates[1]) - 1
  const col =
    perspective === WHITE_PLAYER_PERSPECTIVE
      ? FILES_ARRAY.indexOf(coordinates[0])
      : FILES_ARRAY.length - FILES_ARRAY.indexOf(coordinates[0]) - 1

  const prevRow =
    perspective === WHITE_PLAYER_PERSPECTIVE
      ? RANKS_ARRAY.length - Number(prevCoordinates[1])
      : Number(prevCoordinates[1]) - 1
  const prevCol =
    perspective === WHITE_PLAYER_PERSPECTIVE
      ? FILES_ARRAY.indexOf(prevCoordinates[0])
      : FILES_ARRAY.length - FILES_ARRAY.indexOf(prevCoordinates[0]) - 1

  return { row, col, pieceName: pieces[prevRow][prevCol].description }
}

const convertToRad = (element) => (element * Math.PI) / 180

export const generateCoordinatesForPromotion = (
  variantsCount,
  perspective,
  promotionColor,
  size,
  column
) => {
  let endAngle = 180
  let startAngle = perspective[0] === promotionColor ? 0 : 360

  if (column === 0) {
    endAngle = promotionColor === perspective[0] ? 90 : 270
  } else if (column === 7) {
    startAngle = promotionColor === perspective[0] ? 180 : 270
    endAngle = promotionColor === perspective[0] ? 90 : 180
  } else {
    endAngle = perspective[0] === promotionColor ? 20 : 340
    startAngle = perspective[0] === promotionColor ? 160 : 200
  }

  return new Array(variantsCount).fill(0, 0, variantsCount).map((el, index) => {
    const angle =
      startAngle + ((endAngle - startAngle) / (variantsCount - 1)) * index

    return {
      position: 'absolute',
      left:
        size * PROMOTION_OFFSET_RELATIVE + Math.cos(convertToRad(angle)) * size,
      top:
        size * PROMOTION_OFFSET_RELATIVE + Math.sin(convertToRad(angle)) * size
    }
  })
}
