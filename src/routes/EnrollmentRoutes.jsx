import EnrollmentForm from "../features/enrollments/EnrollmentForm";
import EnrollmentList from "../features/enrollments/EnrollmentList";

const EnrollmentRoutes = () => [
  {
    path: "enroll",
    element: <EnrollmentForm />,
  },
  {
    path: "list",
    element: <EnrollmentList />,
  },
];

export default EnrollmentRoutes;
