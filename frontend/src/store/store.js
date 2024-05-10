import { configureStore } from '@reduxjs/toolkit'

// api slice
import { apiSlice } from './slice/api/api.slice'

export default configureStore({
  reducer: {
    // api reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: import.meta.env.MODE === 'development',
})
