import { PRODUCTS_URL } from '../constants'
import { apiSlice } from './apiSlice.api'

export const productsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => PRODUCTS_URL,
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetProductsQuery } = productsEndpoints
