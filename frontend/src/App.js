import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

import { Container } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className='app__container'>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route exact path='/cart/:id?' component={CartScreen} />
          <Route exact path='/' component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
