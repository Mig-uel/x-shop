import { useGetProductsQuery } from '../store/api/productsEndpoints.api'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product.component'
import Loader from '../components/loader.component'

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <>
      <h1>Latest Products</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error?.data?.message || error?.error}</p>
      ) : (
        <Row>
          {products.map((product) => (
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
