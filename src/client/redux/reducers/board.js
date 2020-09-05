const UPDATE_SCORE = 'UPDATE_SCORE'

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
    default:
      return state
  }
}

export function updateScore(score) {
  return { type: UPDATE_SCORE, score }
}
