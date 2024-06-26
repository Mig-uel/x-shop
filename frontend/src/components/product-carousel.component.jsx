import { Link } from 'react-router-dom'
import { useGetTopProductsQuery } from '../store/api/productsEndpoints.api'

/** UI Elements */
import Loader from './loader.component'
import Message from './message.component'
import { Carousel, Image } from 'react-bootstrap'

const ProductCarousel = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery()

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
export default ProductCarousel
