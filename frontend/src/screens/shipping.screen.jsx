import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../store/cart/cartSlice'

/** UI Elements */
import { Row, Col, Form, Button } from 'react-bootstrap'
import Steps from '../components/steps.component'
import FormContainer from '../components/form-container.component'

const ShippingScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector(({ cart }) => cart)

  const [address, setAddress] = useState(shippingAddress?.address || '')
  const [city, setCity] = useState(shippingAddress?.city || '')
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  )
  const [country, setCountry] = useState(shippingAddress?.country || '')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <Steps step1 step2 />
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='1 Flatbush Ave'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Brooklyn'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row className='my-2'>
          <Col sm={12} md={6}>
            <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='number'
                placeholder='11217'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='United States'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
