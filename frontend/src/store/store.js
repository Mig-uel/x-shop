import { configureStore } from '@reduxjs/toolkit'

// API Slice
import { apiSlice } from './api/apiSlice'

export default configureStore({
  reducer: {
    // api reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.MODE === 'development',
})
