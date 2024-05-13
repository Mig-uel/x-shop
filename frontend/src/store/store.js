import { configureStore } from '@reduxjs/toolkit'

// API Slice
import { apiSlice } from './api/apiSlice'

// Cart Slice
import cartSliceReducer from './cart/cartSlice'

export default configureStore({
  reducer: {
    cart: cartSliceReducer,
    // api reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.MODE === 'development',
})
