import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddCourseMutation } from "./courseApiSlice";
import { useGetTrainersQuery } from "../trainers/trainerApiSlice";
import { toast } from "react-toastify";

const AddCourseForm = () => {
  const navigate = useNavigate();
  const [addCourse, { isLoading, isError, error }] = useAddCourseMutation();
  const { data: trainers = [], isLoading: isLoadingTrainers } =
    useGetTrainersQuery();
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedTrainerDetails, setSelectedTrainerDetails] = useState(null);

  // Debug
  console.log("Trainers data:", trainers);
  console.log("isLoadingTrainers:", isLoadingTrainers);
  console.log("selectedTrainer:", selectedTrainer);
  console.log("selectedTrainerDetails:", selectedTrainerDetails);

  // Update selected trainer details when trainer selection changes
  useEffect(() => {
    if (selectedTrainer && Array.isArray(trainers) && trainers.length > 0) {
      console.log("Looking for trainer with ID:", selectedTrainer);
      console.log("Available trainers:", trainers);

      const trainerDetails = trainers.find((trainer) => {
        const trainerId = trainer._id || trainer.id;
        console.log("Comparing", trainerId, "with", selectedTrainer);
        return trainerId === selectedTrainer;
      });

      console.log("Found trainer details:", trainerDetails);
      setSelectedTrainerDetails(trainerDetails || null);
    } else {
      setSelectedTrainerDetails(null);
    }
  }, [selectedTrainer, trainers]);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    description: Yup.string().required("Course description is required"),
    trainer: Yup.string().required("Trainer selection is required"),
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
        // Make sure trainer is sent as a string ID, not an object
        const newCourse = {
          ...values,
          trainer: values.trainer, // This should now be just the ID string
        };

        console.log("Submitting new course with data:", newCourse);

        await addCourse(newCourse).unwrap();
        toast.success("Course added successfully");
        navigate("/admin/dashboard/courses");
      } catch (err) {
        console.error("Failed to add course:", err);
        toast.error(
          "Failed to add course: " +
            (err.data?.message || err.error || "Unknown error")
        );
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-9">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6">
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

          {/* Trainer Selection */}
          <div>
            <label className="block text-yellow-500 mb-2">Trainer</label>
            {isLoadingTrainers ? (
              <p className="text-yellow-500">Loading trainers...</p>
            ) : (
              <>
                <select
                  name="trainer"
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
                  value={formik.values.trainer}
                  onChange={(e) => {
                    formik.setFieldValue("trainer", e.target.value);
                    setSelectedTrainer(e.target.value);
                  }}
                  onBlur={formik.handleBlur}>
                  <option value="">Select a trainer</option>
                  {Array.isArray(trainers) && trainers.length > 0 ? (
                    trainers.map((trainer) => (
                      <option
                        key={trainer._id || trainer.id}
                        value={trainer._id || trainer.id}>
                        {trainer.name} - {trainer.expertise || "No expertise"}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No trainers available
                    </option>
                  )}
                </select>

                {/* Trainer Preview */}
                {selectedTrainerDetails && (
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      {selectedTrainerDetails.image ? (
                        <img
                          src={selectedTrainerDetails.image}
                          alt={selectedTrainerDetails.name}
                          className="w-20 h-20 rounded-full object-cover mr-4"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center mr-4">
                          <span className="text-2xl text-gray-400">👤</span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-yellow-500 font-semibold text-lg">
                          {selectedTrainerDetails.name}
                        </h3>
                        <p className="text-gray-300">
                          {selectedTrainerDetails.expertise}
                        </p>
                        {selectedTrainerDetails.experience && (
                          <p className="text-gray-400 text-sm">
                            Experience: {selectedTrainerDetails.experience}{" "}
                            years
                          </p>
                        )}
                        {selectedTrainerDetails.bio && (
                          <p className="text-gray-400 text-sm mt-2">
                            {selectedTrainerDetails.bio}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      Trainer ID: {selectedTrainer}
                    </p>
                  </div>
                )}
              </>
            )}
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
            className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold flex items-center justify-center">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              "Add Course"
            )}
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
