import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App.jsx'

// styles
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'
import HomeScreen from './screens/home.screen.jsx'
import ProductScreen from './screens/product.screen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='' element={<HomeScreen />} />
      <Route index path='/product/:id' element={<ProductScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
