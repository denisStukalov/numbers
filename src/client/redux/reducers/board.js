const UPDATE_SCORE = 'UPDATE_SCORE'
const SET_RANDOM_CELL = 'SET_RANDOM_CELL'

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

export function setRandomCell() {
  return (dispatch, getState) => {
    const freeCells = getState().board.field.filter((c) => c.value === 0)
    return dispatch({
      type: SET_RANDOM_CELL,
      index: freeCells[Math.floor(Math.random() * freeCells.length)].index
    })
  }
}
