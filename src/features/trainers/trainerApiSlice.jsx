import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trainerApiSlice = createApi({
  reducerPath: "trainerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/apitrainers" }), // Adjust to backend URL
  tagTypes: ["Trainer"],
  endpoints: (builder) => ({
    // Fetch all trainers
    getTrainers: builder.query({
      query: () => "/",
      providesTags: ["Trainer"],
    }),

    // Fetch a specific trainer by ID
    getTrainerById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Trainer"],
    }),

    // Add a new trainer
    addTrainer: builder.mutation({
      query: (newTrainer) => ({
        url: "/add",
        method: "POST",
        body: newTrainer,
      }),
      invalidatesTags: ["Trainer"],
    }),

    // Update a trainer
    updateTrainer: builder.mutation({
      query: ({ id, updatedTrainer }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedTrainer,
      }),
      invalidatesTags: ["Trainer"],
    }),

    // Delete a trainer
    deleteTrainer: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trainer"],
    }),
  }),
});

export const {
  useGetTrainersQuery,
  useGetTrainerByIdQuery,
  useAddTrainerMutation,
  useUpdateTrainerMutation,
  useDeleteTrainerMutation,
} = trainerApiSlice;
