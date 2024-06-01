import { apiSlice } from "../api/apiSlice";

//const BACKEND_BASE_URLBE = "http://localhost:7000/" 
const BACKEND_BASE_URLBE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    
    getAllProducts: builder.query({
      //query: () => `https://shofy-backend.vercel.app/api/product/all`,
      query: () => `${BACKEND_BASE_URLBE}`+'api/product/all',


      providesTags:['Products']
    }),
    getProductType: builder.query({
      // query: ({ type, query }) => `https://shofy-backend.vercel.app/api/product/${type}?${query}`,
     /* query: ({ type, query }) => `${BACKEND_BASE_URLBE}`+'api/product/'+`${type}?${query}`,
      providesTags:['ProductType']*/
      query: ({ type, query }) => `${BACKEND_BASE_URLBE}`+'api/product/'+`${type}?${query}`,
      providesTags:['ProductType']

    }),

    getOfferProducts: builder.query({
      //query: (type) => `https://shofy-backend.vercel.app/api/product/offer?type=${type}`,
      query: (type) => `${BACKEND_BASE_URLBE}`+'api/product/'+`offer?type=${type}`,
      providesTags:['OfferProducts']
    }),
    getPopularProductByType: builder.query({
      //query: (type) => `https://shofy-backend.vercel.app/api/product/popular/${type}`,
      query: (type) => `${BACKEND_BASE_URLBE}`+'api/product/popular/'+`${type}`,

      providesTags:['PopularProducts']
    }),
    getTopRatedProducts: builder.query({
     // query: () => `https://shofy-backend.vercel.app/api/product/top-rated`,
      query: () => `${BACKEND_BASE_URLBE}`+'api/product/top-rated',
      providesTags:['TopRatedProducts']
    }),
    // get single product
    getProduct: builder.query({
     // query: (id) => `https://shofy-backend.vercel.app/api/product/single-product/${id}`,
      query: (id) => `${BACKEND_BASE_URLBE}`+'api/product/single-product/'+`${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id:arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
     // query: (id) => `https://shofy-backend.vercel.app/api/product/related-product/${id}`,
      query: (id) => `${BACKEND_BASE_URLBE}`+'api/product/related-product/'+`${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;
