import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "./courseApiSlice";

const EditCourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading: isFetching } = useGetCourseByIdQuery(id);
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    description: Yup.string().required("Course description is required"),
    trainer: Yup.string().required("Trainer ID is required"),
    schedule: Yup.array().of(Yup.string()).required("Schedule is required"),
    capacity: Yup.number()
      .min(1, "Capacity must be at least 1")
      .required("Capacity is required"),
    level: Yup.string()
      .oneOf(["Beginner", "Intermediate", "Advanced"], "Invalid level")
      .required("Level is required"),
    duration: Yup.string().required("Duration is required"),
    type: Yup.string()
      .oneOf(["Online", "Offline"], "Invalid type")
      .required("Type is required"),
  });

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
        await updateCourse({ id, updatedCourse: values }).unwrap();
        navigate("/courses");
      } catch (err) {
        console.error("Failed to update course:", err);
      }
    },
  });

  useEffect(() => {
    if (course) {
      formik.setValues({
        name: course.name,
        description: course.description,
        trainer: course.trainer,
        schedule: course.schedule,
        capacity: course.capacity,
        level: course.level,
        duration: course.duration,
        type: course.type,
      });
    }
  }, [course]);

  if (isFetching) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-9">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">
          Edit Course
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-yellow-500">Course Name</label>
            <input
              type="text"
              name="name"
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

          {/* Capacity */}
          <div>
            <label className="block text-yellow-500">Capacity</label>
            <input
              type="number"
              name="capacity"
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
            disabled={isUpdating}
            className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold">
            {isUpdating ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourseForm;
