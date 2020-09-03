import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import Board from './components/board'
import store from './redux'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Board />
    </Provider>
  )
  const divElement = getByText(/0/i)
  expect(divElement).toBeInTheDocument()
})
