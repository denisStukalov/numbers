import React from 'react'

const Cell = ({ value }) => {
  return (
    <div className='w-12 h-12 border-solid border border-gray-100'>
      {value > 0 ? value : ' '}
    </div>
  )
}

export default Cell
