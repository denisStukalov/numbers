import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import Board from '../client/components/board'
import store from '../client/redux'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Board />
    </Provider>
  )
  const divElement = getByText(/0/i)
  expect(divElement).toBeInTheDocument()
})
