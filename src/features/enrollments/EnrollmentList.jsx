import {
  useGetEnrollmentsQuery,
  useCancelEnrollmentMutation,
} from "./enrollmentApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EnrollmentList = () => {
  const {
    data: enrollments = [],
    isLoading,
    isError,
    refetch,
  } = useGetEnrollmentsQuery();
  const [cancelEnrollment, { isLoading: isCanceling }] =
    useCancelEnrollmentMutation();
  const { user } = useSelector((state) => state.auth);

  if (isLoading)
    return <p className="text-yellow-500">Loading enrollments...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load enrollments.</p>;

  // Filter out invalid enrollments
  const validEnrollments = enrollments.filter((enrollment) => {
    const isValid =
      enrollment._id &&
      (enrollment.courseId || enrollment.course?._id || enrollment.course?.id);

    if (!isValid) {
      console.warn("Invalid enrollment data:", enrollment);
    }
    return isValid;
  });

  const handleCancel = async (enrollmentId) => {
    // Get the enrollment by ID
    const enrollment = validEnrollments.find((e) => e._id === enrollmentId);

    if (!enrollment || !enrollment.courseId) {
      console.error("Invalid enrollment or missing courseId:", enrollment);
      toast.error("Invalid enrollment data");
      return;
    }

    // Get user ID, preferring user.id but falling back to _id if needed
    const userId = user?.id || user?._id;
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this enrollment?"))
      return;

    try {
      const result = await cancelEnrollment({
        courseId: enrollment.courseId.toString(),
        userId: userId.toString(),
      }).unwrap();

      if (result) {
        toast.success("Enrollment cancelled successfully");
        refetch();
      }
    } catch (error) {
      console.error("Cancel error:", error);
      if (error.status === 404) {
        toast.error("Enrollment not found. The course ID might be invalid.");
      } else if (error.status === 400) {
        toast.error("Invalid course ID format");
      } else if (error.status === 403) {
        toast.error("You don't have permission to cancel this enrollment");
      } else if (error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to cancel enrollment. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-yellow-500 text-xl font-semibold mb-4">
        Your Enrollments
      </h2>

      {validEnrollments.length === 0 ? (
        <p className="text-gray-400">No enrollments found.</p>
      ) : (
        <ul className="space-y-4">
          {validEnrollments.map((enrollment) => (
            <li
              key={enrollment._id}
              className="bg-gray-800 p-4 rounded-md flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-yellow-500 font-medium">
                  {enrollment.courseName || "Unknown Course"}
                </span>
                <span className="text-gray-400 text-sm">
                  Status: {enrollment.status}
                </span>
                {enrollment.enrollmentDate && (
                  <span className="text-gray-400 text-sm">
                    Enrolled:{" "}
                    {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </span>
                )}
                <span className="text-gray-400 text-xs">
                  ID: {enrollment._id}
                </span>
              </div>
              <button
                onClick={() => handleCancel(enrollment._id)}
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
