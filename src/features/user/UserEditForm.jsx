import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../features/user/userApiSlice";
import { toast } from "react-toastify";

const UserEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      isAdmin: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        await updateUser({ id, ...values }).unwrap();
        toast.success("User updated successfully");
        navigate("/admin/dashboard/users/list");
      } catch (error) {
        toast.error("Failed to update user");
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        username: user.username || "",
        email: user.email || "",
        isAdmin: user.isAdmin || false,
      });
    }
  }, [user]);

  if (isLoading)
    return <p className="text-center text-yellow-500">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load user data.</p>
    );

  return (
    <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-yellow-500 text-center mb-6">
        Edit User
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-lg font-medium text-yellow-500 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.username}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-yellow-500 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Is Admin Checkbox */}
        <div>
          <label className="block text-lg font-medium text-yellow-500 mb-2">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formik.values.isAdmin}
              onChange={formik.handleChange}
              className="mr-2"
            />
            Is Admin
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition duration-300 font-semibold"
            disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEditForm;
