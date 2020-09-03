import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateScore } from '../redux/reducers/board'

const Board = () => {
  const board = useSelector((s) => s.board)
  const dispatch = useDispatch()
  return (
    <div>
      <div>{board.score}</div>
      <div>
        <input
          type='button'
          value='+'
          onClick={() => {
            dispatch(updateScore(board.score + 1))
          }}
        />
      </div>
    </div>
  )
}

export default Board
