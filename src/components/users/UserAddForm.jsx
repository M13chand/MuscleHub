// src/components/users/UserAddForm.jsx
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../../api/userApiSlice';

const UserAddForm = () => {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').min(3, 'Username should be at least 3 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
    isAdmin: Yup.boolean(),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  const handleSubmit = async (values) => {
    try {
      await createUser(values);
      navigate('/users');
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Field
              type="text"
              id="username"
              name="username"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="isAdmin" className="inline-flex items-center text-sm font-medium text-gray-700">
              <Field type="checkbox" id="isAdmin" name="isAdmin" className="mr-2" />
              Admin
            </label>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add User
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UserAddForm;
