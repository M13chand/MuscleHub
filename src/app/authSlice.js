import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  user: null,
  token: null,
};

// Create the authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user credentials (token and user info)
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Action to log out the user
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export the actions from authSlice
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;