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
    // Add logging for requests and responses
    fetchFn: async (...args) => {
      console.log("🔄 API Request:", args[0]);
      try {
        const response = await fetch(...args);
        const responseClone = response.clone();
        try {
          const data = await responseClone.json();
          console.log("✅ API Response:", data);
        } catch (e) {
          console.log("❌ Could not parse response as JSON");
        }
        return response;
      } catch (error) {
        console.error("❌ API Error:", error);
        throw error;
      }
    },
  }),
  tagTypes: ['User', 'Course', 'Trainer', 'Enrollment', 'Review'],
  endpoints: () => ({}),
});

export default apiSlice;
