import { apiSlice } from "../../app/apiSlice";

export const enrollmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation({
      query: ({ courseId, userId }) => ({
        url: `/enrollments/${courseId}/enroll`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Enrollments"],
    }),

    getEnrollments: builder.query({
      query: () => `/enrollments/history`,
      transformResponse: (response) => {
        return response
          .map((enrollment) => ({
            ...enrollment,
            courseId:
              enrollment.courseId ||
              enrollment.course?._id ||
              enrollment.course?.id,
            courseName:
              enrollment.course?.name ||
              enrollment.courseName ||
              "Unknown Course",
            status: enrollment.status || "Active",
            enrollmentDate:
              enrollment.enrollmentDate ||
              enrollment.createdAt ||
              new Date().toISOString(),
          }))
          .filter((enrollment) => enrollment._id != null); // Filter out invalid entries
      },
      providesTags: ["Enrollments"],
    }),

    cancelEnrollment: builder.mutation({
      query: ({ courseId, userId }) => ({
        url: `/enrollments/${courseId}/cancel`,
        method: "DELETE",
        body: { userId },
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
enrollmentApiSlice;
