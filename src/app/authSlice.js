import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Add this
  token: localStorage.getItem("token") || null,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState, // ✅ Use the initial state here
  reducers: {
    setCredentials: (state, action) => {
      const { username, email, isAdmin, token } = action.payload;
      state.user = { username, email, isAdmin };
      state.token = token;
      state.isAdmin = isAdmin || false;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      localStorage.setItem("user", JSON.stringify({ username, email, isAdmin })); // Save user data in localStorage
    },
    logout: (state) => {
      console.log("👋 Logging Out");
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("user"); // Remove user data from localStorage
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
