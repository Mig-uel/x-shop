import { useGetProductsQuery } from '../store/api/productsEndpoints.api'
import { useParams } from 'react-router-dom'

// UI Components
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product.component'
import Loader from '../components/loader.component'
import Message from '../components/message.component'

const HomeScreen = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber })

  return (
    <>
      <h1>Latest Products</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Row>
          {data.products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
