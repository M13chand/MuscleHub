// src/components/users/UserUpdateForm.jsx
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../api/userApiSlice";

const UserUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing user data
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        username: user.username,
        email: user.email,
        password: "",
        isAdmin: user.isAdmin,
      });
    }
  }, [user]);

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username should be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().min(6, "Password should be at least 6 characters"),
    isAdmin: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    try {
      await updateUser({ id, userData: values });
      navigate("/users");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user details</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="isAdmin"
              className="inline-flex items-center text-sm font-medium text-gray-700">
              <Field
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                className="mr-2"
              />
              Admin
            </label>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Update User
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserUpdateForm;
