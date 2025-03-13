import AddCourseForm from "../features/courses/AddCourseForm";
import EditCourseForm from "../features/courses/EditCourseForm";
import CourseList from "../features/courses/CoursesList";
import CourseDetail from "../features/courses/CourseDetail";
import EnrollmentList from "../features/enrollments/EnrollmentList";
import UserList from "../features/user/UserList";

import UserEditForm from "../features/user/UserEditForm";
import UserDetail from "../features/user/UserDetail";
import TrainerList from "../features/trainers/TrainerList";
import TrainerAddForm from "../features/trainers/TrainerAddForm";
import TrainerEditForm from "../features/trainers/TrainerEditForm";
import ReviewList from "../features/reviews/ReviewsList"; // Admin can view reviews but not add

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

  // Users Routes
  {
    path: "users/list",
    element: <UserList />,
  },

  {
    path: "users/edit/:id",
    element: <UserEditForm />,
  },
  {
    path: "users/:id",
    element: <UserDetail />,
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
