import AddCourseForm from "../features/courses/AddCourseForm";
import EditCourseForm from "../features/courses/EditCourseForm";
import CourseList from "../features/courses/CoursesList";
import CourseDetail from "../features/courses/CourseDetail";
import EnrollmentList from "../features/enrollments/EnrollmentList";
import UserList from "../features/user/UserList";
import UserEditForm from "../features/user/UserEditForm";
import UserPage from "../pages/admin/UserPage"; // Import the UserPage component
import TrainerList from "../features/trainers/TrainerList";
import TrainerAddForm from "../features/trainers/TrainerAddForm";
import TrainerEditForm from "../features/trainers/TrainerEditForm";
import ReviewList from "../features/reviews/ReviewsList"; // Admin can view reviews but not add
import UserAddForm from "../features/user/UserAddForm";

const AdminRoutes = () => [
  // Courses Routes
  {
    path: "courses/add",
    element: <AddCourseForm />,
  },
  {
    path: "courses/edit/:id",
    element: <EditCourseForm />,
  },
  {
    path: "courses/:id",
    element: <CourseDetail />,
  },
  {
    path: "courses/list",
    element: <CourseList />,
  },

  // Enrollment Routes
  {
    path: "enrollments/list",
    element: <EnrollmentList />,
  },

  // Users Routes (Nested Routes under /admin/dashboard/users)
  {
    path: "users",
    element: <UserPage />, // UserPage will handle the routing for listing, editing, and adding users
    children: [
      { path: "list", element: <UserList /> }, // This will render the list of users
      { path: "add", element: <UserAddForm /> }, // This will render the add user form
      { path: "edit/:id", element: <UserEditForm /> }, // This will render the edit user form
    ],
  },

  // Trainers Routes
  {
    path: "trainers/list",
    element: <TrainerList />,
  },
  {
    path: "trainers/add",
    element: <TrainerAddForm />,
  },
  {
    path: "trainers/edit/:id",
    element: <TrainerEditForm />,
  },

  // Reviews Routes (Admins can only view reviews)
  {
    path: "reviews/list",
    element: <ReviewList />,
  },
];

export default AdminRoutes;
