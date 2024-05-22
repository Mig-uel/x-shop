import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/** UI Elements */
import Steps from '../components/steps.component'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

const PlaceOrderScreen = () => {
  const cart = useSelector(({ cart }) => cart)
  console.log(cart)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate('/shipping')
    else if (!cart.paymentMethod) navigate('/payment')
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate])

  return (
    <>
      <Steps step1 step2 step3 step4 />

      <Row>
        <Col md={8}></Col>
        <Col md={4}></Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
Reflect
