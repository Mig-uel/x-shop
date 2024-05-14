import { createSlice } from '@reduxjs/toolkit/react'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

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

      // Calculate items price (If order > $100, free ship. Else, $10)
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )

      // Calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

      // Calculate tax price (15%)
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2)

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
