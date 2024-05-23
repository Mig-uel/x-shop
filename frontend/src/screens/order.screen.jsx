import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../store/api/ordersEndpoints.api'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

/** UI Elements */
import Message from '../components/message.component'
import Loader from '../components/loader.component'
import { toast } from 'react-toastify'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

const OrderScreen = () => {
  const { id: orderId } = useParams()
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId)

  /** Payment */
  const [payOrder, { isLoading: isLoadingPayment }] = usePayOrderMutation()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const { userInfo } = useSelector(({ auth }) => auth)
  const {
    data: paypalClientId,
    isLoading: isLoadingPayPalClientId,
    error: errorPayPalClientId,
  } = useGetPayPalClientIdQuery()

  useEffect(() => {
    if (
      !errorPayPalClientId &&
      !isLoadingPayPalClientId &&
      paypalClientId.clientId
    ) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypalClientId.clientId,
            currency: 'USD',
          },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript()
        }
      }
    }
  }, [
    order,
    errorPayPalClientId,
    isLoadingPayPalClientId,
    paypalClientId,
    paypalDispatch,
  ])

  /** PayPal Button Handlers */
  const onApproveTest = async (data, actions) => {
    await payOrder({ orderId, details: { payer: {} } })
    refetch()
    toast.success('Payment successful')
  }
  const createOrderHandler = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => orderId)
  }
  const onApproveHandler = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('Payment successful')
      } catch (error) {
        toast.error(error?.data?.message || error?.message)
      }
    })
  }
  const onErrorHandler = (error) => toast.error(error.message)

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>
      {error?.data?.message || error?.error || error}
    </Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row className='my-4'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
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
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {isLoadingPayPalClientId && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrderHandler}
                          onApprove={onApproveHandler}
                          onError={onErrorHandler}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
