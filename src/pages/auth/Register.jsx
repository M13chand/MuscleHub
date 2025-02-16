// src/features/RegisterPage.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import axios from "axios"; // Import Axios for making HTTP requests

const RegisterPage = () => {
  // Define validation schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Send registration data to backend
      const response = await axios.post("/api/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      // Handle success (e.g., show success message or redirect)
      alert("User registered successfully!");
      // You can redirect to login or home page
      window.location.href = "/login";
    } catch (error) {
      setErrors({ general: error.response.data.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Register</h1>

      {/* Formik Form */}
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema} // Add Yup validation schema
        onSubmit={handleSubmit} // Handle form submission
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block font-medium">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

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

            {/* General Error Message */}
            {errors.general && (
              <div className="text-red-500 text-sm mt-3">{errors.general}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
