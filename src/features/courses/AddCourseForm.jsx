import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddCourseMutation } from "./courseApiSlice";

const AddCourseForm = () => {
  const navigate = useNavigate();
  const [addCourse, { isLoading, isError, error }] = useAddCourseMutation();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    description: Yup.string().required("Course description is required"),
    trainer: Yup.string().required("Trainer ID is required"),
    schedule: Yup.array().of(Yup.string()).required("Schedule is required"),
    capacity: Yup.number()
      .min(1, "Capacity must be at least 1")
      .required("Capacity is required"),
    level: Yup.string()
      .oneOf(["Beginner", "Intermediate", "Advanced"])
      .required("Level is required"),
    duration: Yup.string().required("Duration is required"),
    type: Yup.string()
      .oneOf(["Online", "Offline"])
      .required("Type is required"),
  });

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      trainer: "",
      schedule: [],
      capacity: 10,
      level: "Beginner",
      duration: "",
      type: "Online",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await addCourse(values).unwrap();
        navigate("/courses");
      } catch (err) {
        console.error("Failed to add course:", err);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-9">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">
          Add New Course
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-yellow-500">Course Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter course name"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-yellow-500">Description</label>
            <textarea
              name="description"
              placeholder="Enter course description"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Trainer ID */}
          <div>
            <label className="block text-yellow-500">Trainer ID</label>
            <input
              type="text"
              name="trainer"
              placeholder="Enter trainer ID"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              value={formik.values.trainer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.trainer && formik.errors.trainer && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.trainer}
              </p>
            )}
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-yellow-500">Schedule</label>
            <input
              type="text"
              name="schedule"
              placeholder="Enter schedule (comma separated)"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              value={formik.values.schedule.join(", ")}
              onChange={(e) =>
                formik.setFieldValue(
                  "schedule",
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              onBlur={formik.handleBlur}
            />
            {formik.touched.schedule && formik.errors.schedule && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.schedule}
              </p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-yellow-500">Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Enter capacity"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.capacity && formik.errors.capacity && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.capacity}
              </p>
            )}
          </div>

          {/* Level */}
          <div>
            <label className="block text-yellow-500">Level</label>
            <select
              name="level"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              value={formik.values.level}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {formik.touched.level && formik.errors.level && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.level}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-yellow-500">Duration</label>
            <input
              type="text"
              name="duration"
              placeholder="Enter duration (e.g., 1 hour)"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.duration && formik.errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.duration}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold">
            {isLoading ? "Adding..." : "Add Course"}
          </button>
        </form>
        {isError && (
          <p className="text-red-500 text-sm mt-3">{error?.data?.message}</p>
        )}
      </div>
    </div>
  );
};

export default AddCourseForm;
