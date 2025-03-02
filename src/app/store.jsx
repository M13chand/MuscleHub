// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from "./authSlice";
import { userApiSlice } from "../features/user/userApiSlice";
import { courseApiSlice } from "../features/courses/courseApiSlice";
import { trainerApiSlice } from "../features/trainers/trainerApiSlice";
import { authApiSlice } from "../features/auth/authApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ Added authReducer
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [courseApiSlice.reducerPath]: courseApiSlice.reducer,
    [trainerApiSlice.reducerPath]: trainerApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(courseApiSlice.middleware)
      .concat(trainerApiSlice.middleware)
      .concat(authApiSlice.middleware),
  devTools: true,
});

export default store;
window.store = store; // ✅ Debugging purpose
