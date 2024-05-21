import { createSlice } from '@reduxjs/toolkit/react'
import { updateCart } from '../../utils/cart.utils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload: item }) => {
      // Check if item exist
      const itemExist = state.cartItems.find((i) => i._id === item._id)

      if (itemExist) {
        // If item exist,return new updated item, else return original item
        state.cartItems = state.cartItems.map((i) =>
          i._id === itemExist._id ? item : i
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== payload)

      return updateCart(state)
    },
    saveShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload
      return updateCart(state)
    },
  },
})
export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions
export default cartSlice.reducer
