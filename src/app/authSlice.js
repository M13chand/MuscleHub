import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState, // ✅ Use the initial state here
  reducers: {
    setCredentials: (state, action) => {
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
        isAdmin: action.payload.isAdmin,
      };
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin || false;

      console.log("The state is", state);
      // Save to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin));
    },
    logout: (state) => {
      console.log("👋 Logging Out");
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
