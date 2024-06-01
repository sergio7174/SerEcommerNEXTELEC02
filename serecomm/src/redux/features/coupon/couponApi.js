import { apiSlice } from "@/redux/api/apiSlice";

//const BACKEND_BASE_URLBE = "http://localhost:7000/" 
const BACKEND_BASE_URLBE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const authApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    // get offer coupon
    getOfferCoupons: builder.query({
     // query: () => `https://shofy-backend.vercel.app/api/coupon`,
      query: () => `${BACKEND_BASE_URLBE}`+'api/coupon',
      providesTags:['Coupon'],
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetOfferCouponsQuery } = authApi;
