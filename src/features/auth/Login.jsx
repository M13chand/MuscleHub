// src/pages/auth/LoginPage.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await loginUser(values).unwrap();
      console.log("🔹 API Login Response:", response);

      dispatch(setCredentials(response)); // ✅ Store user in Redux
      alert("User logged in successfully!");
      navigate("/dashboard"); // ✅ Redirect user after login
    } catch (err) {
      console.error("❌ Login error:", err);
      setErrors({ general: err?.data?.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-4 text-yellow-500">
          Login
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, values, errors, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-yellow-500">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-yellow-500">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {errors.general && (
                <div className="text-red-500 text-sm mt-3">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold">
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
