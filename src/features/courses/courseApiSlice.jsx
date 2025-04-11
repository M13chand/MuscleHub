// src/features/courses/courseApiSlice.js

import { apiSlice } from "../../app/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all courses
    getCourses: builder.query({
      query: () => "/courses",
      transformResponse: (response) => {
        // Transform the response to handle MongoDB _id field
        return response.map((course) => ({
          ...course,
          id: course.id || course._id, // Ensure id field exists alongside _id
          trainerId:
            course.trainerId || course.trainer?._id || course.trainer?.id,
          trainerName: course.trainer?.name || "Unknown Trainer",
        }));
      },
      providesTags: (result = []) => [
        { type: "Course", id: "LIST" },
        ...result.map(({ id }) => ({ type: "Course", id })),
      ],
    }),

    // Fetch a specific course by ID
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    // Add a new course
    addCourse: builder.mutation({
      query: (newCourse) => ({
        url: "/courses/add",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),

    // Update a course
    updateCourse: builder.mutation({
      query: ({ id, updatedCourse }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body: updatedCourse,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Course", id },
        { type: "Course", id: "LIST" },
      ],
    }),

    // Delete a course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Course", id },
        { type: "Course", id: "LIST" },
      ],
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
