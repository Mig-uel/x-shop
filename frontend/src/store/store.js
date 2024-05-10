import { configureStore } from '@reduxjs/toolkit'

// api slice
import { apiSlice } from './api/apiSlice.api'

export default configureStore({
  reducer: {
    // api reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.MODE === 'development',
})
