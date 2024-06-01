import { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from '../store/api/productsEndpoints.api'
import { addToCart } from '../store/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

// UI Components
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/rating.component'
import Loader from '../components/loader.component'
import Message from '../components/message.component'
import { toast } from 'react-toastify'

const ProductScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductByIdQuery(id) // product
  const [createReview, { isLoading: isLoadingCreateReview }] =
    useCreateReviewMutation() // review

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { userInfo } = useSelector(({ auth }) => auth)

  // handlers
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: quantity }))
    navigate('/cart')
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (rating && comment) {
      try {
        const res = await createReview({
          productId: id,
          rating,
          comment,
        }).unwrap()

        toast.success(res.message)
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error?.error)
      }
    } else toast.error('Please fill out all rating fields')
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (i) => (
                                <option key={i + 1}>{i + 1}</option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='review my-3'>
            <Col md={6}>
              <h2>Reviews</h2>

              {product.reviews.length === 0 && (
                <Message>No reviews yet</Message>
              )}

              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  {userInfo ? (
                    <>
                      <h2>Write a Customer Review</h2>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating' className='my-2'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value='' disabled>
                              Select...
                            </option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment' className='my-2'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>
                        <Button
                          disabled={isLoadingCreateReview}
                          type='submit'
                          variant='primary'
                        >
                          Add Review
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <Message variant='primary'>
                      <Link to={`/login?redirect=${pathname}`}>Login</Link> to
                      add review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
