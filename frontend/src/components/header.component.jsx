import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { removeCredentials } from '../store/auth/authSlice'
import { useLogoutMutation } from '../store/api/usersEndpoints.api'

// UI Components
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../assets/logo.png'

const Header = () => {
  const [logout] = useLogoutMutation()
  const { cartItems } = useSelector(({ cart }) => cart)
  const { userInfo } = useSelector(({ auth }) => auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(removeCredentials())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='X-Shop Logo' />
              X-Shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
