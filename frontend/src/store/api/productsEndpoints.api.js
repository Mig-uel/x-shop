import { PRODUCTS_URL } from '../constants'
import { apiSlice } from './api.slice'

export const productsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      getProducts: () => PRODUCTS_URL,
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetProductsQuery } = productsEndpoints
