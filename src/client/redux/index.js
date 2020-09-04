import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createRootReducer from './reducers'

const middleWare = [thunk]
const initState = {}
const composeFunc =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnchanters = composeFunc(applyMiddleware(...middleWare))
const store = createStore(createRootReducer(), initState, composedEnchanters)

export default store
