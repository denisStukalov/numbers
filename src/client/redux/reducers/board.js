const UPDATE_SCORE = 'UPDATE_SCORE'
const SET_RANDOM_CELL = 'SET_RANDOM_CELL'
const MOVE_CELLS = 'MOVE_CELLS'

const initState = {
  size: 4,
  field: Array.from(Array(16), (c, index) => ({
    value: 0,
    index,
    summed: false
  })),
  score: 0
}

export default (state = initState, action) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return {
        ...state,
        score: action.score
      }
    case MOVE_CELLS:
      return {
        ...state,
        field: action.field
      }
    case SET_RANDOM_CELL:
      return {
        ...state,
        field: [
          ...state.field.filter((f) => f.index !== action.index),
          { value: 2, index: action.index, summed: false }
        ].sort((a, b) => a.index - b.index)
      }
    default:
      return state
  }
}

const moveLeftFunc = (cells, size) => {
  const field = [...cells]
  let hasChanges = false
  do {
    hasChanges = false
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size - 1; column++) {
        const index = column + row * size
        if (
          (field[index].value === 0 && field[index + 1].value === 0) ||
          field[index].summed ||
          field[index + 1].summed
        ) {
          continue
        }
        if (
          field[index].value === field[index + 1].value ||
          field[index].value === 0
        ) {
          field[index].summed = field[index].value !== 0
          field[index].value = field[index].value + field[index + 1].value
          field[index + 1].value = 0
          hasChanges = true
        }
      }
    }
  } while (hasChanges)
  field.map((f) => {
    f.summed = false
  })
  return field
}

const moveRightFunc = (cells, size) => {
  const field = [...cells]
  let hasChanges = false
  do {
    hasChanges = false
    for (let row = 0; row < size; row++) {
      for (let column = size - 1; column > 0; column--) {
        const index = column + row * size
        if (
          (field[index].value === 0 && field[index - 1].value === 0) ||
          field[index].summed ||
          field[index - 1].summed
        ) {
          continue
        }
        if (
          field[index].value === field[index - 1].value ||
          field[index].value === 0
        ) {
          field[index].summed = field[index].value !== 0
          field[index].value = field[index].value + field[index - 1].value
          field[index - 1].value = 0
          hasChanges = true
        }
      }
    }
    field.map((f) => {
      f.summed = false
    })
  } while (hasChanges)
  return field
}

export function updateScore(score) {
  return { type: UPDATE_SCORE, score }
}

export function moveLeft() {
  return (dispatch, getState) => {
    const size = getState().board.size
    const field = moveLeftFunc([...getState().board.field], size)
    return dispatch({ type: MOVE_CELLS, field })
  }
}

export function moveRight() {
  return (dispatch, getState) => {
    const size = getState().board.size
    const field = moveRightFunc([...getState().board.field], size)
    return dispatch({ type: MOVE_CELLS, field })
  }
}

export function setRandomCell() {
  return (dispatch, getState) => {
    const freeCells = getState().board.field.filter((c) => c.value === 0)
    return dispatch({
      type: SET_RANDOM_CELL,
      index: freeCells[Math.floor(Math.random() * freeCells.length)].index
      //index: 4
    })
  }
}
