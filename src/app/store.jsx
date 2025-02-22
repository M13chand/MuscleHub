import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { userApiSlice } from "../features/user/userApiSlice";
import { courseApiSlice } from "../features/courses/courseApiSlice";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [courseApiSlice.reducerPath]: courseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(apiSlice.middleware)
      .concat(courseApiSlice.middleware),
});

export default store;
