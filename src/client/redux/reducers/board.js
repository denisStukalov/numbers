const UPDATE_SCORE = 'UPDATE_SCORE'
const SET_RANDOM_CELL = 'SET_RANDOM_CELL'
const MOVE_LEFT = 'MOVE_LEFT'

const initState = {
  size: 4,
  field: Array.from(Array(16), (c, index) => ({ value: 0, index })),
  score: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return {
        ...state,
        score: action.score
      }
    case MOVE_LEFT:
      return {
        ...state,
        field: action.field
      }
    case SET_RANDOM_CELL:
      return {
        ...state,
        field: [
          ...state.field.filter((f) => f.index !== action.index),
          { value: 2, index: action.index }
        ].sort((a, b) => a.index - b.index)
      }
    default:
      return state
  }
}

export function updateScore(score) {
  return { type: UPDATE_SCORE, score }
}

export function moveLeft() {
  return (dispatch, getState) => {
    const field = [...getState().board.field]
    const size = getState().board.size
    let hasChanges = false
    do {
      hasChanges = false
      for (let row = 0; row < size; row++) {
        for (let column = 0; column < size - 1; column++) {
          if (
            (field[column + row * size].value ===
              field[column + row * size + 1].value &&
              field[column + row * size].value !== 0) ||
            (field[column + row * size].value === 0 &&
              field[column + row * size + 1].value !== 0)
          ) {
            field[column + row * size].value =
              field[column + row * size].value +
              field[column + row * size + 1].value
            field[column + row * size + 1].value = 0
            hasChanges = true
          }
        }
      }
    } while (hasChanges)
    return dispatch({ type: MOVE_LEFT, field })
  }
}

export function setRandomCell() {
  return (dispatch, getState) => {
    const freeCells = getState().board.field.filter((c) => c.value === 0)
    return dispatch({
      type: SET_RANDOM_CELL,
      index: freeCells[Math.floor(Math.random() * freeCells.length)].index
    })
  }
}
