// src/features/courses/courseApiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApiSlice = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/courses' }), // Adjust to your backend URL
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    // Fetch all courses
    getCourses: builder.query({
      query: () => '/', // Fetch all courses
      providesTags: ['Course'],
    }),

    // Fetch a specific course by ID
    getCourseById: builder.query({
      query: (id) => `/${id}`, // Fetch a specific course by ID
      providesTags: ['Course'],
    }),

    // Add a new course
    addCourse: builder.mutation({
      query: (newCourse) => ({
        url: '/add',
        method: 'POST',
        body: newCourse,
      }),
      invalidatesTags: ['Course'],
    }),

    // Update a course
    updateCourse: builder.mutation({
      query: ({ id, updatedCourse }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedCourse,
      }),
      invalidatesTags: ['Course'],
    }),

    // Delete a course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApiSlice;
