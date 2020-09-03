import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import Board from './components/board'
import * as serviceWorker from './serviceWorker'
import store from './redux'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Board />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
