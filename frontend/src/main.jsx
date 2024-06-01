import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App.jsx'

/** Global State */
import { Provider } from 'react-redux'
import store from './store/store.js'

/** Styles */
import './assets/styles/index.css'
import './assets/styles/bootstrap.custom.css'

/** Screen Elements */
import HomeScreen from './screens/home.screen.jsx'
import ProductScreen from './screens/product.screen.jsx'
import CartScreen from './screens/cart.screen.jsx'
import LoginScreen from './screens/login.screen.jsx'
import RegisterScreen from './screens/register.screen.jsx'
import PrivateRoute from './components/private-route.component.jsx'
import ShippingScreen from './screens/shipping.screen.jsx'
import PaymentScreen from './screens/payment.screen.jsx'
import PlaceOrderScreen from './screens/place-order.screen.jsx'
import OrderScreen from './screens/order.screen.jsx'
import ProfileScreen from './screens/profile.screen.jsx'
import AdminRoute from './components/admin-route.component.jsx'
import OrderListScreen from './screens/admin/order-list.screen.jsx'
import ProductListScreen from './screens/admin/product-list.screen.jsx'
import ProductEditScreen from './screens/admin/product-edit.screen.jsx'
import UserListScreen from './screens/admin/user-list.screen.jsx'
import UserEditScreen from './screens/admin/user-edit.screen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path='product/:id' element={<ProductScreen />} />
      <Route path='cart' element={<CartScreen />} />
      <Route path='login' element={<LoginScreen />} />
      <Route path='register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='shipping' element={<ShippingScreen />} />
        <Route path='payment' element={<PaymentScreen />} />
        <Route path='placeorder' element={<PlaceOrderScreen />} />
        <Route path='orders/:id' element={<OrderScreen />} />
        <Route path='profile' element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
)
