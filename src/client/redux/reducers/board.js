const UPDATE_SCORE = 'UPDATE_SCORE'
const SET_RANDOM_CELL = 'SET_RANDOM_CELL'
const MOVE_CELLS = 'MOVE_CELLS'
const GAME_OVER = 'GAME_OVER'

const initState = {
  size: 4,
  field: Array.from(Array(16), (c, index) => ({
    value: 0,
    index,
    summed: false
  })),
  score: 0,
  step: 0,
  gameover: false
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
        field: action.field,
        score: state.score + action.score,
        step: state.step + (action.nextStep ? 1 : 0)
      }
    case SET_RANDOM_CELL:
      return {
        ...state,
        field: action.field
      }
    case GAME_OVER:
      return {
        ...state,
        field: action.field,
        gameover: true
      }
    default:
      return state
  }
}

const moveLeftFunc = (cells, size) => {
  const field = [...cells]
  let score = 0
  let hasChanges = false
  let nextStep = false
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
          hasChanges = true
          nextStep = true
          score =
            field[index].value === 0
              ? score + 0
              : score + field[index].value + field[index + 1].value
          field[index].summed = field[index].value !== 0
          field[index].value = field[index].value + field[index + 1].value
          field[index + 1].value = 0
        }
      }
    }
  } while (hasChanges)
  field.map((f) => {
    f.summed = false
  })
  return { field, score, nextStep }
}

const moveRightFunc = (cells, size) => {
  const field = [...cells]
  let score = 0
  let hasChanges = false
  let nextStep = false
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
          hasChanges = true
          nextStep = true
          score =
            field[index].value === 0
              ? score + 0
              : score + field[index].value + field[index - 1].value
          field[index].summed = field[index].value !== 0
          field[index].value = field[index].value + field[index - 1].value
          field[index - 1].value = 0
        }
      }
    }
  } while (hasChanges)
  field.map((f) => {
    f.summed = false
  })
  return { field, score, nextStep }
}

const moveUpFunc = (cells, size) => {
  const field = [...cells]
  let score = 0
  let hasChanges = false
  let nextStep = false
  do {
    hasChanges = false
    for (let column = 0; column < size; column++) {
      for (let row = 0; row < size - 1; row++) {
        const indexFirst = column + row * size
        const indexSecond = column + (row + 1) * size
        if (
          (field[indexFirst].value === 0 && field[indexSecond].value === 0) ||
          field[indexFirst].summed ||
          field[indexSecond].summed
        ) {
          continue
        }
        if (
          field[indexFirst].value === field[indexSecond].value ||
          field[indexFirst].value === 0
        ) {
          hasChanges = true
          nextStep = true
          score =
            field[indexFirst].value === 0
              ? score + 0
              : score + field[indexFirst].value + field[indexSecond].value
          field[indexFirst].summed = field[indexFirst].value !== 0
          field[indexFirst].value =
            field[indexFirst].value + field[indexSecond].value
          field[indexSecond].value = 0
        }
      }
    }
  } while (hasChanges)
  field.map((f) => {
    f.summed = false
  })
  return { field, score, nextStep }
}

const moveDownFunc = (cells, size) => {
  const field = [...cells]
  let score = 0
  let hasChanges = false
  let nextStep = false
  do {
    hasChanges = false
    for (let column = 0; column < size; column++) {
      for (let row = size - 1; row > 0; row--) {
        const indexFirst = column + row * size
        const indexSecond = column + (row - 1) * size
        if (
          (field[indexFirst].value === 0 && field[indexSecond].value === 0) ||
          field[indexFirst].summed ||
          field[indexSecond].summed
        ) {
          continue
        }
        if (
          field[indexFirst].value === field[indexSecond].value ||
          field[indexFirst].value === 0
        ) {
          hasChanges = true
          nextStep = true
          score =
            field[indexFirst].value === 0
              ? score + 0
              : score + field[indexFirst].value + field[indexSecond].value
          field[indexFirst].summed = field[indexFirst].value !== 0
          field[indexFirst].value =
            field[indexFirst].value + field[indexSecond].value
          field[indexSecond].value = 0
        }
      }
    }
  } while (hasChanges)
  field.map((f) => {
    f.summed = false
  })
  return { field, score, nextStep }
}

const checkStepAvaliable = (cells, size) => {
  if (cells.filter((c) => c.value === 0).length > 1) return true

  for (let column = 0; column < size - 1; column++) {
    for (let row = 0; row < size - 1; row++) {
      const index = column + row * size
      const newColumnIndex = column + 1 + row * size
      const newRowIndex = column + (row + 1) * size
      if (
        cells[index].value === cells[newColumnIndex].value ||
        cells[index].value === cells[newRowIndex].value
      ) {
        return true
      }
    }
  }
  return false
}

export function updateScore(score) {
  return { type: UPDATE_SCORE, score }
}

export function moveLeft() {
  return (dispatch, getState) => {
    const size = getState().board.size
    const { field, score, nextStep } = moveLeftFunc(
      [...getState().board.field],
      size
    )
    return dispatch({ type: MOVE_CELLS, field, score, nextStep })
  }
}

export function moveRight() {
  return (dispatch, getState) => {
    const size = getState().board.size
    const { field, score, nextStep } = moveRightFunc(
      [...getState().board.field],
      size
    )
    return dispatch({ type: MOVE_CELLS, field, score, nextStep })
  }
}

export function moveUp() {
  return (dispatch, getState) => {
    const size = getState().board.size
    const { field, score, nextStep } = moveUpFunc(
      [...getState().board.field],
      size
    )
    return dispatch({ type: MOVE_CELLS, field, score, nextStep })
  }
}

export function moveDown() {
  return (dispatch, getState) => {
    const size = getState().board.size
    const { field, score, nextStep } = moveDownFunc(
      [...getState().board.field],
      size
    )
    return dispatch({ type: MOVE_CELLS, field, score, nextStep })
  }
}

export function setRandomCell() {
  return (dispatch, getState) => {
    const { field, size } = getState().board
    const freeCells = field.filter((c) => c.value === 0)
    const randomIndex =
      freeCells[Math.floor(Math.random() * freeCells.length)].index
    const newfield = [
      ...field.filter((f) => f.index !== randomIndex),
      { value: 2, index: randomIndex, summed: false }
    ].sort((a, b) => a.index - b.index)

    const gameOver =
      freeCells.length === 1 && !checkStepAvaliable([...newfield], size)
    return dispatch({
      type: gameOver ? GAME_OVER : SET_RANDOM_CELL,
      field: newfield
    })
  }
}
