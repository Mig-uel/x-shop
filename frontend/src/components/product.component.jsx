import { Card } from 'react-bootstrap'

const Product = ({ product: { _id, image, name, price } }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />
      </a>

      <Card.Body>
        <a href={`/product/${_id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        </a>

        <Card.Text as='h3'>${price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
