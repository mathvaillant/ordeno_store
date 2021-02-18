import './App.scss'
import Header from './components/Header/Header'

import { Container } from 'react-bootstrap'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Ordenô</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
