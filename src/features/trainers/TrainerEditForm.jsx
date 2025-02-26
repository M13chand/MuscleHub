import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetTrainerByIdQuery,
  useUpdateTrainerMutation,
} from "./trainerApiSlice";

const TrainerEditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: trainer, isLoading } = useGetTrainerByIdQuery(id);
  const [updateTrainer, { isLoading: isUpdating }] = useUpdateTrainerMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Trainer name is required"),
    specialty: Yup.string().required("Specialty is required"),
    experience: Yup.number()
      .min(0, "Experience must be a positive number")
      .required("Experience is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: trainer?.name || "",
      specialty: trainer?.specialty || "",
      experience: trainer?.experience || "",
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("specialty", values.specialty);
      formData.append("experience", values.experience);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      try {
        await updateTrainer({ id, formData }).unwrap();
        navigate("/trainers");
      } catch (error) {
        console.error("Failed to update trainer", error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      formik.setFieldValue("image", file);
    }
  };

  if (isLoading) return <p>Loading trainer details...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-9">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">
          Edit Trainer
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-yellow-500">Specialty</label>
            <input
              type="text"
              name="specialty"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              {...formik.getFieldProps("specialty")}
            />
            {formik.touched.specialty && formik.errors.specialty && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.specialty}
              </p>
            )}
          </div>

          <div>
            <label className="block text-yellow-500">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              {...formik.getFieldProps("experience")}
            />
            {formik.touched.experience && formik.errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.experience}
              </p>
            )}
          </div>

          <div>
            <label className="block text-yellow-500">Trainer Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              onChange={handleImageChange}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition font-bold">
            {isUpdating ? "Updating..." : "Update Trainer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerEditForm;
