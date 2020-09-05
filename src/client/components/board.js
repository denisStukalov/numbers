import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateScore } from '../redux/reducers/board'

const Board = () => {
  const board = useSelector((s) => s.board)
  const dispatch = useDispatch()
  return (
    <div className='min-w-screen min-h-screen bg-gray-900 flex flex-wrap content-around justify-center'>
      <div className='bg-indigo-600 w-3/4 rounded-lg justify-center items-center flex text-white'>
        <div className='w-full'>
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
      </div>
    </div>
  )
}

export default Board
