import { createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRootReducer from './reducers'

const initState = {}

const composeFunc =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnchanters = composeFunc()
const store = createStore(createRootReducer(), initState, composedEnchanters)

export default store
