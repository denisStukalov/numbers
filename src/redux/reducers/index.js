import { combineReducers } from 'redux'
import board from './board'

const createRootReducer = () =>
  combineReducers({
    board
  })

export default createRootReducer
