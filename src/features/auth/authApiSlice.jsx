import { apiSlice } from "../../app/apiSlice";
import { setCredentials, logout } from "../../app/authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login", // ✅ Make sure this matches your backend
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("🔹 API Login Response:", data);

          if (data.token) {
            // ✅ Store token & user info in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            // ✅ Store in Redux
            dispatch(setCredentials(data));
          } else {
            console.error("❌ No token received in login response");
          }
        } catch (err) {
          console.error("❌ Login error:", err);
        }
      },
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // ✅ Remove token & user from localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          // ✅ Clear Redux state
          dispatch(logout());
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
