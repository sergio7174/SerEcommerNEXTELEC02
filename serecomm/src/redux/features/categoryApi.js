import { apiSlice } from "../api/apiSlice";

//const BACKEND_BASE_URLBE = "http://localhost:7000/" 
const BACKEND_BASE_URLBE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({

    addCategory: builder.mutation({
      query: (data) => ({
        // url: "https://shofy-backend.vercel.app/api/category/add",
        url: `${BACKEND_BASE_URLBE}`+'api/category/add',

        method: "POST",
        body: data,
      }),
    }),

    getShowCategory: builder.query({
      //query: () => `https://shofy-backend.vercel.app/api/category/show`
      query: () => `${BACKEND_BASE_URLBE}`+'api/category/show'
    }),
    
    getProductTypeCategory: builder.query({
      query: (type) => `${BACKEND_BASE_URLBE}`+'api/category/show/'+`${type}`
    }),

    getAllCategory: builder.query({
      query: () => `${BACKEND_BASE_URLBE}`+'api/category/all'
    }),

    


  }),
});

export const {
 useAddCategoryMutation,
 useGetProductTypeCategoryQuery,
 useGetShowCategoryQuery,
} = categoryApi;