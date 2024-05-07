import Rating from './rating.component'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({
  product: { _id, image, name, price, rating, numReviews },
}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3'>${price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
