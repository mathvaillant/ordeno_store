import './App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen'

import { Container } from 'react-bootstrap'

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className='latest'>LATEST PRODUCTS</h1>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
