import React from 'react'
import { render, screen } from '@testing-library/react'

import HomeScreen from './HomeScreen'

describe('HomeScreen', () => {
  test('renders without crashing', () => {
    render(<HomeScreen />)

    screen.debug()
  })
})
