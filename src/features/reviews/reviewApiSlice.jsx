import { apiSlice } from "../../app/apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["Review"],
    }),
    addReview: builder.mutation({
      query: (formData) => ({
        url: "/reviews/add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;
