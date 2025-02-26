import {
  useGetEnrollmentsQuery,
  useCancelEnrollmentMutation,
} from "./enrollmentApiSlice";
import { useSelector } from "react-redux";

const EnrollmentList = () => {
  const {
    data: enrollments = [],
    isLoading,
    isError,
  } = useGetEnrollmentsQuery();
  const [cancelEnrollment, { isLoading: isCanceling }] =
    useCancelEnrollmentMutation();
  const { user } = useSelector((state) => state.auth);

  if (isLoading)
    return <p className="text-yellow-500">Loading enrollments...</p>;

  // if (isError)
  //   return <p className="text-red-500">Failed to load enrollments.</p>;

  const handleCancel = async (enrollmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this enrollment?"
    );
    if (confirmCancel) {
      await cancelEnrollment({ enrollmentId, userId: user.id });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-yellow-500 text-xl font-semibold mb-4">
        Your Enrollments
      </h2>

      {enrollments.length === 0 ? (
        <p className="text-gray-400">No enrollments found.</p>
      ) : (
        <ul className="space-y-4">
          {enrollments.map((enrollment) => (
            <li
              key={enrollment.id}
              className="bg-gray-800 p-4 rounded-md flex justify-between items-center">
              <span className="text-yellow-500">{enrollment.course.name}</span>
              <button
                onClick={() => handleCancel(enrollment.id)}
                disabled={isCanceling}
                className={`px-3 py-1 rounded-md transition ${
                  isCanceling
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}>
                {isCanceling ? "Canceling..." : "Cancel"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrollmentList;
