import { useDispatch, useSelector } from 'react-redux'
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from '../../store/api/usersEndpoints.api'
import { LinkContainer } from 'react-router-bootstrap'

/** UI Elements */
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { Table, Button } from 'react-bootstrap'
import Message from '../../components/message.component'
import Loader from '../../components/loader.component'
import { toast } from 'react-toastify'

const UserListScreen = () => {
  const {
    data: users,
    refetch,
    isLoading: isLoadingUsers,
    error,
  } = useGetAllUsersQuery()

  const [deleteUser, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserMutation()

  const deleteUserHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await deleteUser(id).unwrap()
        toast.success(res.message)
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoadingUsers ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>JOINED</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user?.name}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>
                  <a href={`mailto:${user.email}`}> {user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
