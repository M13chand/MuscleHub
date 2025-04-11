import { apiSlice } from "../../app/apiSlice"; // Importing the base API slice

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users", // /users endpoint will be appended to baseUrl
      transformResponse: (response) => {
        // Transform the response to add id field for consistency
        return response.map((user) => ({
          ...user,
          id: user.id || user._id, // Ensure id field exists alongside _id
        }));
      },
      providesTags: (result) => (result ? [{ type: "User", id: "LIST" }] : []), // Cache list of users with a 'LIST' tag
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`, // /users/:id endpoint
      providesTags: (result, error, id) => [
        { type: "User", id }, // Cache the specific user by ID
      ],
    }),
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `users/${id}`, // /users/:id endpoint
        method: "PUT",
        body: userData,
      }),
      // Invalidate only the updated user (not the entire list)
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id }, // Invalidate the specific user by ID
        { type: "User", id: "LIST" }, // Optionally invalidate the list to keep it fresh
      ],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`, // /users/:id endpoint
        method: "DELETE",
      }),
      // Invalidate the cache for the specific user and the user list
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "users/add", // /users/add endpoint
        method: "POST",
        body: userData,
      }),
      // Invalidate the cache for the user list after adding a new user
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddUserMutation,
} = userApiSlice;
