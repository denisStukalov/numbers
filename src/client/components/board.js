import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setRandomCell } from '../redux/reducers/board'
import Cell from './cell'

const Board = () => {
  const { field, score, size } = useSelector((s) => s.board)
  const dispatch = useDispatch()

  const rows = field.reduce((acc, rec, index) => {
    if (index % size === 0) {
      return [...acc, [rec]]
    }
    acc[acc.length - 1] = [...acc[acc.length - 1], rec]
    return acc
  }, [])

  useEffect(() => {
    dispatch(setRandomCell())
  }, [])

  return (
    <div className='min-w-screen min-h-screen bg-gray-900 flex flex-wrap content-around justify-center'>
      <div className='bg-indigo-600 rounded-lg text-white'>
        <div className='bg-indigo-700 rounded-t-lg pl-5'>Score: {score}</div>
        <div className='w-full flex justify-center p-5'>
          <div className='border border-gray-100'>
            {rows.map((row, index) => {
              return (
                <div key={index} className='flex'>
                  {row.map((cell) => {
                    return <Cell value={cell.value} key={cell.index} />
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
