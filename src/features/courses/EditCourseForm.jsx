import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "./courseApiSlice";
import { useGetTrainersQuery } from "../trainers/trainerApiSlice";
import { toast } from "react-toastify";

const EditCourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading: isFetching } = useGetCourseByIdQuery(id);
  const { data: trainers = [], isLoading: isLoadingTrainers } =
    useGetTrainersQuery();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedTrainerDetails, setSelectedTrainerDetails] = useState(null);

  // Debug
  console.log("Course data:", course);
  console.log("Trainers data:", trainers);

  const validationSchema = Yup.object({
    name: Yup.string().required("Course name is required"),
    description: Yup.string().required("Course description is required"),
    trainer: Yup.string().required("Trainer selection is required"),
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
        // Make sure trainer is sent as a string ID, not an object
        const updatedCourse = {
          ...values,
          trainer: values.trainer, // This should now be just the ID string
        };

        console.log("Submitting course update with data:", updatedCourse);

        await updateCourse({ id, updatedCourse }).unwrap();
        toast.success("Course updated successfully");
        navigate("/admin/dashboard/courses");
      } catch (err) {
        console.error("Failed to update course:", err);
        toast.error(
          "Failed to update course: " +
            (err.data?.message || err.error || "Unknown error")
        );
      }
    },
  });

  useEffect(() => {
    if (course) {
      console.log("Setting form values from course:", course);

      // Extract trainer ID - could be an object or string
      let trainerId = "";
      if (typeof course.trainer === "string") {
        trainerId = course.trainer;
      } else if (course.trainer && course.trainer._id) {
        trainerId = course.trainer._id;
      } else if (course.trainer && course.trainer.id) {
        trainerId = course.trainer.id;
      } else if (course.trainerId) {
        trainerId = course.trainerId;
      }

      setSelectedTrainer(trainerId);

      formik.setValues({
        name: course.name || "",
        description: course.description || "",
        trainer: trainerId,
        schedule: course.schedule || [],
        capacity: course.capacity || 10,
        level: course.level || "Beginner",
        duration: course.duration || "",
        type: course.type || "Online",
      });
    }
  }, [course]);

  // Update selected trainer details when trainer selection changes
  useEffect(() => {
    if (selectedTrainer && trainers.length > 0) {
      const trainerDetails = trainers.find(
        (trainer) =>
          trainer._id === selectedTrainer || trainer.id === selectedTrainer
      );
      setSelectedTrainerDetails(trainerDetails || null);
      console.log("Selected trainer details:", trainerDetails);
    } else {
      setSelectedTrainerDetails(null);
    }
  }, [selectedTrainer, trainers]);

  if (isFetching) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-9">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6">
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
                  {trainers.map((trainer) => (
                    <option
                      key={trainer._id || trainer.id}
                      value={trainer._id || trainer.id}>
                      {trainer.name} - {trainer.expertise}
                    </option>
                  ))}
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
            className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold flex items-center justify-center">
            {isUpdating ? (
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
                Updating...
              </>
            ) : (
              "Update Course"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourseForm;
