// src/pages/auth/RegisterPage.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUserMutation } from "./authApiSlice";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

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

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await registerUser(values).unwrap();
      console.log("Registration successful:", response);
      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setErrors({ general: err?.data?.message || "Registration failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-4 text-yellow-500">
          Register
        </h1>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ errors, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block font-medium text-yellow-500">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-yellow-500">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-yellow-500">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div className="text-red-500 text-sm mt-3">
                  {errors.general}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold">
                {isLoading ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
