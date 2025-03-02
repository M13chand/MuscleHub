import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['User', 'Course', 'Trainer', 'Enrollment', 'Review'], // Tags for cache updates
  endpoints: () => ({}),
});

export default apiSlice;