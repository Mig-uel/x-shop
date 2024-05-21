import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../store/auth/authSlice'
import { useLoginMutation } from '../store/api/usersEndpoints.api'

/** UI Components */
import { Form, Button, Row, Col, Toast } from 'react-bootstrap'
import FormContainer from '../components/form-container.component'
import Loader from '../components/loader.component'
import { toast } from 'react-toastify'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { search } = useLocation() // get query string for current url
  const searchParams = new URLSearchParams(search) // handle query string
  const redirect = searchParams.get('redirect') || '/' // will be '/shipping' or '/'

  const [login, { data, error, isLoading }] = useLoginMutation()
  const { userInfo } = useSelector(({ auth }) => auth) // userInfo state

  useEffect(() => {
    if (userInfo) navigate(redirect)
  }, [userInfo, redirect, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='john@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row>
          <Button type='submit' variant='primary' className='mt-2'>
            Sign In
          </Button>
        </Row>
        <Row>
          <Col className='mt-2'>
            New Customer? <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
