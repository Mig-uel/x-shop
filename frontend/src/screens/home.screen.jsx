import { useGetProductsQuery } from '../store/api/productsEndpoints.api'
import { Link, useSearchParams } from 'react-router-dom'

// UI Components
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product.component'
import Loader from '../components/loader.component'
import Message from '../components/message.component'
import Paginate from '../components/paginate.component'

const HomeScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // search params
  const keyword = searchParams.get('keyword') || ''
  const pageNumber = searchParams.get('pageNumber')

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })

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
        <>
          {keyword && data.products.length > 0 && (
            <Link to='/' className='btn btn-light mb-4 mt-1'>
              Go Back
            </Link>
          )}

          <Row>
            {data.products.length === 0 && (
              <Message variant='danger'>
                You look lost... Come back <Link to='/'>Home</Link>
              </Message>
            )}
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
