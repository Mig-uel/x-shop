import { PRODUCTS_URL, UPLOADS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const productsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => PRODUCTS_URL,
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    getProductById: builder.query({
      query: (id) => `${PRODUCTS_URL}${id}`,
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}${data.productId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOADS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}${productId}`,
        method: 'DELETE',
        invalidatesTags: ['Product'],
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productsEndpoints
