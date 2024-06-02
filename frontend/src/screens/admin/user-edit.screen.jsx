import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../store/api/usersEndpoints.api'

/** UI Elements */
import { toast } from 'react-toastify'
import Message from '../../components/message.component'
import Loader from '../../components/loader.component'
import FormContainer from '../../components/form-container.component'
import { Form, Button, InputGroup } from 'react-bootstrap'

const UserEditScreen = () => {
  const { id: userId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    data: user,
    isLoading: isLoadingUserDetails,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: isLoadingUpdateUser }] =
    useUpdateUserMutation()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const updateUserHandler = async (e) => {
    e.preventDefault()
    const updatedUser = {
      userId,
      name,
      email,
      isAdmin,
    }

    try {
      const res = await updateUser(updatedUser).unwrap()
      toast.success(res.message)
      refetch()
      navigate('/admin/userlist')
    } catch (error) {
      toast.error(error?.data?.error || error?.error)
    }
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>

        {isLoadingUserDetails ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error?.error}
          </Message>
        ) : (
          <Form onSubmit={updateUserHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='isAdmin' className='my-2'>
              <Form.Check
                label='Is Admin?'
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              className='my-2'
              disabled={isLoadingUpdateUser}
            >
              {isLoadingUpdateUser ? (
                <Loader width='25px' height='25px' />
              ) : (
                'Update'
              )}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
