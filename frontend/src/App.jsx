import { Container } from 'react-bootstrap'
import Header from './components/header.component'
import Footer from './components/footer.component'
import HomeScreen from './screens/home.screen'

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
        <Footer />
      </main>
    </>
  )
}

export default App
