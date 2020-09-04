const UPDATE_SCORE = 'UPDATE_SCORE'

const initState = {
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
