import { useFormik } from "formik";
import * as Yup from "yup";
import { useEnrollInCourseMutation } from "./enrollmentApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EnrollmentForm = ({ courses }) => {
  const [enrollInCourse, { isLoading }] = useEnrollInCourseMutation();
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: { courseId: "" },
    validationSchema: Yup.object({
      courseId: Yup.string().required("Please select a course"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await enrollInCourse({
          courseId: values.courseId,
          userId: user.id,
        }).unwrap();

        toast.success("Successfully enrolled in course!");
        resetForm();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to enroll in course");
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-yellow-500 text-xl font-semibold mb-4">
        Enroll in a Course
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <select
            id="courseId"
            name="courseId"
            value={formik.values.courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 bg-gray-800 text-yellow-500 rounded-md border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500">
            <option value="">Select a Course</option>
            {courses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} - {course.level}
              </option>
            ))}
          </select>
          {formik.touched.courseId && formik.errors.courseId && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.courseId}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !formik.isValid}
          className={`w-full py-2 rounded-md transition ${
            isLoading || !formik.isValid
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
          }`}>
          {isLoading ? "Enrolling..." : "Enroll Now"}
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;
