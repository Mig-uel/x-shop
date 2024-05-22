import { useState } from 'react'

/** UI Elements */
import FormContainer from '../components/form-container.component'
import { Form, Button, Col } from 'react-bootstrap'
import Steps from '../components/steps.component'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  return (
    <FormContainer>
      <Steps step1 step2 step3 />

      <h1>Payment Method</h1>
      <Form>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              className='my-2'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
