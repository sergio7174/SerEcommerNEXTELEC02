import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";
import Cookies from "js-cookie";

//const BACKEND_BASE_URLBE = "http://localhost:7000/" 
const BACKEND_BASE_URLBE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const authApi = apiSlice.injectEndpoints(
    
  {
  overrideExisting: true,
  endpoints: (builder) => ({
   
    registerUser: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/signup",
        //url: "http://localhost:7000/api/user/signup",
        url: `${BACKEND_BASE_URLBE}`+'api/user/signup', //Development mode

        method: "POST",
        body: data,
      }),
    }),
    // signUpProvider
    signUpProvider: builder.mutation({
      query: (token) => ({

        //url: `https://shofy-backend.vercel.app/api/user/register/${token}`,
        //url: `http://localhost:7000/api/user/register/${token}`,
        url: `${BACKEND_BASE_URLBE}`+'api/user/register/'+`${token}`,
        
        method: "POST",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // login
    loginUser: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/login",
        //url: "http://localhost:7000/api/user/login",
        url: `${BACKEND_BASE_URLBE}`+'api/user/login',

        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // get me
    getUser: builder.query({

      //query: () => "https://shofy-backend.vercel.app/api/user/me",
      //query: () => "https://localhost:7000/api/user/me",
      query: () => `${BACKEND_BASE_URLBE}`+'api/user/me',
      

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // confirmEmail
    confirmEmail: builder.query({
      //query: (token) => `https://shofy-backend.vercel.app/api/user/confirmEmail/${token}`,
      //query: (token) => `https://localhost:7000/api/user/confirmEmail/${token}`,
      query: (token) => `${BACKEND_BASE_URLBE}`+'api/user/confirmEmail/'+`${token}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/forget-password",
        // url: "http://localhost:7000/api/user/forget-password",
        url: `${BACKEND_BASE_URLBE}`+'api/user/forget-password',
        
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    confirmForgotPassword: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/confirm-forget-password",
        //url: "https://localhost:7000/api/user/confirm-forget-password",
        url: `${BACKEND_BASE_URLBE}`+'api/user/confirm-forget-password',


        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    changePassword: builder.mutation({
      query: (data) => ({

        //url: "https://shofy-backend.vercel.app/api/user/change-password",
        //url: "http://localhost:7000/api/user/change-password",
        url: `${BACKEND_BASE_URLBE}`+'api/user/change-password',
        
        
        method: "PATCH",
        body: data,
      }),
    }),
    // updateProfile password
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({

        //url: `https://shofy-backend.vercel.app/api/user/update-user/${id}`,
        //url: `http://localhost:7000/api/user/update-user/${id}`,
        url: `${BACKEND_BASE_URLBE}`+'api/user/update-user/'+`${id}`,
        
        method: "PUT",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useConfirmEmailQuery,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSignUpProviderMutation,
} = authApi;
