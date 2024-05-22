import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCartItems } from '../store/cart/cartSlice'
import { useCreateOrderMutation } from '../store/api/ordersEndpoints.api'

/** UI Elements */
import { toast } from 'react-toastify'
import Steps from '../components/steps.component'
import Message from '../components/message.component'
import Loader from '../components/loader.component'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

const PlaceOrderScreen = () => {
  const cart = useSelector(({ cart }) => cart)
  const [placeOrder, { isLoading, error }] = useCreateOrderMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate('/shipping')
    else if (!cart.paymentMethod) navigate('/payment')
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

  const placeOrderHandler = async () => {
    try {
      const {
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      } = cart

      const res = await placeOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap()

      console.log(res)
      dispatch(clearCartItems())
      navigate(`/orders/${res._id}`)
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  return (
    <>
      <Steps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {cart.cartItems.length > 0 ? (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message>Your cart is empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>
                    {error?.data?.message || error?.error}
                  </Message>{' '}
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems.length === 0 || isLoading}
                    onClick={placeOrderHandler}
                  >
                    {isLoading ? (
                      <Loader width='25px' height='25px' />
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
Reflect
