import { Container } from 'react-bootstrap'
import Header from './components/header.component'
import Footer from './components/footer.component'

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to X-Shop</h1>
        </Container>
        <Footer />
      </main>
    </>
  )
}

export default App
