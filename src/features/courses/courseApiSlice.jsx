// src/features/courses/courseApiSlice.js

import apiSlice from "../../app/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all courses
    getCourses: builder.query({
      query: () => "/courses", // Fetch all courses
      providesTags: ["Course"],
    }),

    // Fetch a specific course by ID
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`, // Fetch a specific course by ID
      providesTags: ["Course"],
    }),

    // Add a new course
    addCourse: builder.mutation({
      query: (newCourse) => ({
        url: "courses/add",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["Course"],
    }),

    // Update a course
    updateCourse: builder.mutation({
      query: ({ id, updatedCourse }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body: updatedCourse,
      }),
      invalidatesTags: ["Course"],
    }),

    // Delete a course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
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
