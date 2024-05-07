import { useParams } from 'react-router-dom'
import products from '../products'

const ProductScreen = () => {
  const { id: productId } = useParams()
  const product = products.find((p) => p._id === productId)

  console.log(product)

  return <h1>Product Screen</h1>
}

export default ProductScreen
