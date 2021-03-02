import React from 'react'
import ReactDOM from 'react-dom'
import './styles/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store.js'
import App from './App.js'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  // Redux pass down to my app the store
  // index.js is the best place to put the Provider
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
