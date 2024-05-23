import { useDispatch, useSelector } from 'react-redux'
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from '../../store/api/productsEndpoints.api'
import { LinkContainer } from 'react-router-bootstrap'

/** UI Elements */
import { toast } from 'react-toastify'
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../../components/message.component'
import Loader from '../../components/loader.component'

const ProductListScreen = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch,
  } = useGetProductsQuery()
  const [
    createProduct,
    { isLoading: isLoadingCreateProduct, error: errorCreateProduct },
  ] = useCreateProductMutation()

  const deleteProductHandler = (productId) => {
    console.log(productId)
  }

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct()
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoadingProducts ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen
