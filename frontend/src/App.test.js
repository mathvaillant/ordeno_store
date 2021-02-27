// The shallow method renders only a single component, without child components
import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import './setupTest'

it('should render my component', () => {
  shallow(<App />)
})
