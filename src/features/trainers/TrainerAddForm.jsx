import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddTrainerMutation } from "./trainerApiSlice";

const TrainerAddForm = () => {
  const navigate = useNavigate();
  const [addTrainer, { isLoading, isError, error }] = useAddTrainerMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Trainer name is required"),
    expertise: Yup.string().required("Expertise is required"),
    experience: Yup.number()
      .min(1, "Experience must be at least 1 year")
      .required("Experience is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bio: Yup.string().required("Bio is required"),
    image: Yup.mixed().required("Image is required"),
  });

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      name: "",
      expertise: "",
      experience: "",
      contact: "",
      email: "",
      bio: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("expertise", values.expertise);
      formData.append("experience", values.experience);
      formData.append("contact", values.contact);
      formData.append("email", values.email);
      formData.append("bio", values.bio);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      try {
        await addTrainer(formData).unwrap();
        navigate("/trainers");
      } catch (err) {
        console.error("Failed to add trainer:", err);
      }
    },
  });

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      formik.setFieldValue("image", file);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-9">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">
          Add New Trainer
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Trainer Name */}
          <div>
            <label className="block text-yellow-500">Trainer Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter trainer name"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-yellow-500">Expertise</label>
            <input
              type="text"
              name="expertise"
              placeholder="Enter expertise"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              {...formik.getFieldProps("expertise")}
            />
            {formik.touched.expertise && formik.errors.expertise && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.expertise}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-yellow-500">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              placeholder="Enter years of experience"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              {...formik.getFieldProps("experience")}
            />
            {formik.touched.experience && formik.errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.experience}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-yellow-500">Contact</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter contact number"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              {...formik.getFieldProps("contact")}
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.contact}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-yellow-500">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-yellow-500">Bio</label>
            <textarea
              name="bio"
              placeholder="Enter a short bio"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              {...formik.getFieldProps("bio")}
            />
            {formik.touched.bio && formik.errors.bio && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-yellow-500">Trainer Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-yellow-500 text-white"
              onChange={handleImageChange}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 text-gray-900 p-2 rounded-lg hover:bg-yellow-400 transition duration-300 font-bold">
            {isLoading ? "Adding..." : "Add Trainer"}
          </button>
        </form>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 text-sm mt-3">{error?.data?.message}</p>
        )}
      </div>
    </div>
  );
};

export default TrainerAddForm;
