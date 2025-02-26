import { apiSlice } from "../../app/apiSlice";

export const enrollmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation({
      query: ({ courseId, userId }) => ({
        url: `/enrollments/${courseId}/enroll`,
        method: "POST",
        body: { userId }, // Send userId in the request body
      }),
    }),
    getEnrollments: builder.query({
      query: () => `/enrollments/history`,
      providesTags: ["Enrollments"],
    }),
    cancelEnrollment: builder.mutation({
      query: ({ courseId, userId }) => ({
        url: `/enrollments/${courseId}/cancel`,
        method: "DELETE",
        body: { userId }, // Send userId in the request body
      }),
      invalidatesTags: ["Enrollments"],
    }),
  }),
});

export const {
  useEnrollInCourseMutation,
  useGetEnrollmentsQuery,
  useCancelEnrollmentMutation,
} = enrollmentApiSlice;
