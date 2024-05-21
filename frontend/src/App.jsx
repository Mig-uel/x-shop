import { Outlet } from 'react-router-dom'

// UI Components
import Header from './components/header.component'
import Footer from './components/footer.component'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
        <Footer />
        <ToastContainer />
      </main>
    </>
  )
}

export default App
