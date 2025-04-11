// src/features/trainers/trainerApiSlice.js

import apiSlice from "../../app/apiSlice";

export const trainerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all trainers
    getTrainers: builder.query({
      query: () => "/trainers", // Fetch all trainers
      providesTags: ["Trainer"],
    }),

    // Fetch a specific trainer by ID
    getTrainerById: builder.query({
      query: (id) => `/trainers/${id}`, // Fetch a specific trainer by ID
      providesTags: ["Trainer"],
    }),

    // Add a new trainer
    addTrainer: builder.mutation({
      query: (newTrainer) => ({
        url: "trainers/add",
        method: "POST",
        body: newTrainer,
      }),
      invalidatesTags: ["Trainer"],
    }),

    // Update a trainer
    updateTrainer: builder.mutation({
      query: ({ id, updatedTrainer }) => ({
        url: `trainers/${id}`,
        method: "PUT",
        body: updatedTrainer,
      }),
      invalidatesTags: ["Trainer"],
    }),

    // Delete a trainer
    deleteTrainer: builder.mutation({
      query: (id) => ({
        url: `trainers/${id}`,
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
