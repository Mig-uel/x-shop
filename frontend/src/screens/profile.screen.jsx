import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateProfileMutation } from '../store/api/usersEndpoints.api'
import { setCredentials } from '../store/auth/authSlice'
import { LinkContainer } from 'react-router-bootstrap'

/** UI Elements */
import Message from '../components/message.component'
import Loader from '../components/loader.component'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const { userInfo } = useSelector(({ auth }) => auth)
  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateProfileMutation()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) toast.error('Passwords do not match')
    else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap()
        dispatch(setCredentials(res))
        toast.success('Profile updated!')
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>{' '}
          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='my-2'>
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
              className='my-2'
              disabled={isLoadingUpdateProfile}
            >
              {isLoadingUpdateProfile ? (
                <Loader width='25px' height='25px' />
              ) : (
                'Update Profile'
              )}
            </Button>
          </Row>
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  )
}

export default ProfileScreen
