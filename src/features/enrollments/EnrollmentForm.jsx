import { useFormik } from "formik";
import * as Yup from "yup";
import { useEnrollInCourseMutation } from "./enrollmentApiSlice";
import { useSelector } from "react-redux";

const EnrollmentForm = ({ courses }) => {
  const [enrollInCourse, { isLoading, isError, error, isSuccess }] =
    useEnrollInCourseMutation();
  const { user } = useSelector((state) => state.auth); // Get logged-in user info

  // Formik Setup
  const formik = useFormik({
    initialValues: { courseId: "" },
    validationSchema: Yup.object({
      courseId: Yup.string().required("Please select a course"),
    }),
    onSubmit: async (values) => {
      await enrollInCourse({ courseId: values.courseId, userId: user.id });
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-yellow-500 text-xl font-semibold mb-4">
        Enroll in a Course
      </h2>

      {isSuccess && <p className="text-green-500">Successfully enrolled!</p>}
      {isError && (
        <p className="text-red-500">
          {error?.data?.message || "Something went wrong"}
        </p>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <select
          name="courseId"
          value={formik.values.courseId}
          onChange={formik.handleChange}
          className="w-full p-2 bg-gray-800 text-yellow-500 rounded-md">
          <option value="">Select a Course</option>
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {formik.errors.courseId && (
          <p className="text-red-500">{formik.errors.courseId}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-500 text-gray-900 py-2 rounded-md hover:bg-yellow-400">
          {isLoading ? "Enrolling..." : "Enroll Now"}
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
