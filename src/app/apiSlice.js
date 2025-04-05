import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // ✅ fixed from accessToken to token
      console.log("📦 Token from Redux:", token); // optional debug

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.warn("⚠️ No token found in Redux");
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Course', 'Trainer', 'Enrollment', 'Review'],
  endpoints: () => ({}),
});

export default apiSlice;
