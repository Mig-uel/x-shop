import { Container } from 'react-bootstrap'
import Header from './components/header.component'
import Footer from './components/footer.component'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </main>
    </>
  )
}

export default App
