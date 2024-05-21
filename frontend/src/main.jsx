import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App.jsx'

// global state
import { Provider } from 'react-redux'
import store from './store/store.js'

// styles
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'

// screens/routes
import HomeScreen from './screens/home.screen.jsx'
import ProductScreen from './screens/product.screen.jsx'
import CartScreen from './screens/cart.screen.jsx'
import LoginScreen from './screens/login.screen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path='product/:id' element={<ProductScreen />} />
      <Route path='cart' element={<CartScreen />} />
      <Route path='login' element={<LoginScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
