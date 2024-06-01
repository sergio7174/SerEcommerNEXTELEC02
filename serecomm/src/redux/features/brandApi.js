import { apiSlice } from "../api/apiSlice";

//const BACKEND_BASE_URLBE = "http://localhost:7000/" 
const BACKEND_BASE_URLBE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    getActiveBrands: builder.query({
      //query: () => `https://shofy-backend.vercel.app/api/brand/active`

      query: () => `${BACKEND_BASE_URLBE}`+'api/brand/active'
    }),
  }),
});

export const {
 useGetActiveBrandsQuery
} = brandApi;