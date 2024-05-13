import { createSlice } from '@reduxjs/toolkit/react'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
})

export default cartSlice.reducer
