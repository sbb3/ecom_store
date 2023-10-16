import { api } from "../api";
import { setCredentials, logOut } from "/src/redux/slices/authSlice";

const authApiEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(`originalPromiseResult`, data);
          dispatch(setCredentials(data));
        } catch (error) {
          console.log(`error 222`, error);
        }
      },
    }),

    sendLogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      onQueryStarted: (data, { dispatch, queryFulfilled }) => {
        try {
          const { data } = queryFulfilled;
          console.log(`originalPromiseResult`, data);
          dispatch(logOut());
        } catch (error) {
          console.log(`error`, error);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
      onSuccess: (data, { dispatch }) => {
        console.log(`login data`, data);
        dispatch(setCredentials(data));
      },
    }),
    getNewAccessToken: builder.query({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      onSuccess: (data, { dispatch }) => {
        dispatch(setCredentials(data));
      },
    }),
  }),
});

export const {
  useLoginMutation,
  usesendLogOutMutation,
  useRegisterMutation,
  usegetNewAccessTokenQuery,
} = authApiEndpoints;
