// src/features/LoginPage.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { login } from "../store/authSlice"; // Import the login action

const LoginPage = () => {
  const dispatch = useDispatch();

  // Define the validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    // Simulate login logic (e.g., make an API call)
    dispatch(login({ email: values.email, name: "User Name" })); // Example user data

    // Redirect to profile page after successful login
    window.location.href = "/profile";
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Login</h1>

      {/* Formik Form */}
      <Formik
        initialValues={{ email: "", password: "" }} // Initial values
        validationSchema={validationSchema} // Add Yup validation schema
        onSubmit={handleSubmit} // Handle form submission
      >
        {({ touched, errors }) => (
          <Form className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
