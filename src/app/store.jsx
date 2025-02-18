import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { userApiSlice } from "../features/user/userApiSlice";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
