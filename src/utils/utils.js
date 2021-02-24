import { PIECES_MAP } from '../constants/boardConstants'
import { BLACK_PLAYER_PERSPECTIVE } from '../constants/systemConstants'

export const checkIsOdd = (value) => {
  return value % 2 === 1
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
            image: pieceImages[PIECES_MAP[element]],
            description: PIECES_MAP[element]
          })
          : pieces[addNumber].push({
            image: pieceImages[PIECES_MAP[element]],
            description: PIECES_MAP[element]
          })
      }
    })
  })

  return pieces
}

export const validateFen = (fen) => {
  const errors = {
    0: 'No errors.',
    1: 'FEN string must contain six space-delimited fields.',
    2: '6th field (move number) must be a positive integer.',
    3: '5th field (half move counter) must be a non-negative integer.',
    4: '4th field (en-passant square) is invalid.',
    5: '3rd field (castling availability) is invalid.',
    6: '2nd field (side to move) is invalid.',
    7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
    8: '1st field (piece positions) is invalid [consecutive numbers].',
    9: '1st field (piece positions) is invalid [invalid piece].',
    10: '1st field (piece positions) is invalid [row too large].',
    11: 'Illegal en-passant square'
  }

  /* 1st criterion: 6 space-seperated fields? */
  const tokens = fen.split(/\s+/)
  if (tokens.length !== 6) {
    return { valid: false, error_number: 1, error: errors[1] }
  }

  /* 2nd criterion: move number field is a integer value > 0? */
  if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
    return { valid: false, error_number: 2, error: errors[2] }
  }

  /* 3rd criterion: half move counter is an integer >= 0? */
  if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
    return { valid: false, error_number: 3, error: errors[3] }
  }

  /* 4th criterion: 4th field is a valid e.p.-string? */
  if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
    return { valid: false, error_number: 4, error: errors[4] }
  }

  /* 5th criterion: 3th field is a valid castle-string? */
  if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
    return { valid: false, error_number: 5, error: errors[5] }
  }

  /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
  if (!/^(w|b)$/.test(tokens[1])) {
    return { valid: false, error_number: 6, error: errors[6] }
  }

  /* 7th criterion: 1st field contains 8 rows? */
  const rows = tokens[0].split('/')
  if (rows.length !== 8) {
    return { valid: false, error_number: 7, error: errors[7] }
  }

  /* 8th criterion: every row is valid? */
  for (let i = 0; i < rows.length; i++) {
    /* check for right sum of fields AND not two numbers in succession */
    let sumFields = 0
    let previousWasNumber = false

    for (let k = 0; k < rows[i].length; k++) {
      if (!isNaN(rows[i][k])) {
        if (previousWasNumber) {
          return { valid: false, error_number: 8, error: errors[8] }
        }
        sumFields += parseInt(rows[i][k], 10)
        previousWasNumber = true
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return { valid: false, error_number: 9, error: errors[9] }
        }
        sumFields += 1
        previousWasNumber = false
      }
    }
    if (sumFields !== 8) {
      return { valid: false, error_number: 10, error: errors[10] }
    }
  }

  if (
    (tokens[3][1] === '3' && tokens[1] === 'w') ||
    (tokens[3][1] === '6' && tokens[1] === 'b')
  ) {
    return { valid: false, error_number: 11, error: errors[11] }
  }

  /* everything's okay! */
  return { valid: true, error_number: 0, error: errors[0] }
}
