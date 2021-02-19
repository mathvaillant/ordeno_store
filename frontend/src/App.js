import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

import { Container } from 'react-bootstrap'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className='app__container'>
          <h1 className='latest'>LATEST PRODUCTS</h1>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          {/* -> /:id means that this is a placeholder */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
