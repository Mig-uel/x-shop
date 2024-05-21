import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../store/auth/authSlice'
import { useRegisterMutation } from '../store/api/usersEndpoints.api'

/** UI Components */
import { Form, Button, Row, Col, Toast } from 'react-bootstrap'
import FormContainer from '../components/form-container.component'
import Loader from '../components/loader.component'
import { toast } from 'react-toastify'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { search } = useLocation() // get query string for current url
  const searchParams = new URLSearchParams(search) // handle query string
  const redirect = searchParams.get('redirect') || '/' // will be '/shipping' or '/'

  const [register, { isLoading }] = useRegisterMutation()
  const { userInfo } = useSelector(({ auth }) => auth) // userInfo state

  useEffect(() => {
    if (userInfo) navigate(redirect)
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        dispatch(setCredentials(res))
        navigate(redirect)
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='********'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Button
            type='submit'
            variant='primary'
            className='mt-2'
            disabled={isLoading}
          >
            {isLoading ? <Loader width={'25px'} height={'25px'} /> : 'Register'}
          </Button>
        </Row>
        <Row>
          <Col className='mt-2'>
            Existing user?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
