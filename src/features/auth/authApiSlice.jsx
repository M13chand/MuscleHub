// src/features/auth/authApiSlice.js
import { apiSlice } from "../../app/apiSlice";
import { setCredentials, logout } from "../../app/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "users/login", // ✅ Correct route
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("🔹 API Login Response:", data);
          dispatch(setCredentials(data)); // ✅ Save token & user in Redux
        } catch (err) {
          console.error("❌ Login error:", err);
        }
      },
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "users/register", // ✅ Correct route
        method: "POST",
        body: userData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "users/logout", // ✅ Correct route
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout()); // ✅ Clear Redux state & localStorage
        } catch (err) {
          console.error("❌ Logout error:", err);
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApiSlice;
