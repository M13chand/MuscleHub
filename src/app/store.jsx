import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { userApiSlice } from "../features/user/userApiSlice";
import { courseApiSlice } from "../features/courses/courseApiSlice";
import { trainerApiSlice } from "../features/trainers/trainerApiSlice";
import authReducer from "../app/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [courseApiSlice.reducerPath]: courseApiSlice.reducer,
    [trainerApiSlice.reducerPath]: trainerApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(userApiSlice.middleware)

      .concat(courseApiSlice.middleware)
      .concat(trainerApiSlice.middleware),
});

export default store;
