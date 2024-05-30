import { useDispatch, useSelector } from 'react-redux'
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../store/api/productsEndpoints.api'
import { LinkContainer } from 'react-router-bootstrap'

/** UI Elements */
import { toast } from 'react-toastify'
import { FaEdit, FaTrash } from 'react-icons/fa'
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

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation()
  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation()

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        const res = await deleteProduct(id).unwrap()
        toast.success(res.message)
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    }
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
          <Button
            className='btn-sm m-3'
            onClick={createProductHandler}
            disabled={isLoadingCreateProduct}
          >
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
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
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
