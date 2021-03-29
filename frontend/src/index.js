import React from 'react'
import ReactDOM from 'react-dom'
import './styles/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store'
import App from './App.js'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
