import CoursesPage from "../pages/admin/CoursesPage";
import AddCourseForm from "../features/courses/AddCourseForm";
import EditCourseForm from "../features/courses/EditCourseForm";
import CourseDetailPage from "../pages/admin/CourseDetailPage";
import EnrollmentList from "../features/enrollments/EnrollmentList";
import UserList from "../features/user/UserList";
import UserEditForm from "../features/user/UserEditForm";
import UserPage from "../pages/admin/UserPage";
import TrainerList from "../features/trainers/TrainerList";
import TrainerAddForm from "../features/trainers/TrainerAddForm";
import TrainerEditForm from "../features/trainers/TrainerEditForm";
import ReviewList from "../features/reviews/ReviewsList";

const adminDashboardRoutes = [
  {
    path: "courses",
    children: [
      {
        index: true,
        element: <CoursesPage />,
      },
      {
        path: "list",
        element: <CoursesPage />,
      },
      {
        path: "add",
        element: <AddCourseForm />,
      },
      {
        path: "edit/:id",
        element: <EditCourseForm />,
      },
      {
        path: ":id",
        element: <CourseDetailPage />,
      },
    ],
  },
  {
    path: "users",
    children: [
      {
        index: true,
        element: <UserPage />,
      },
      {
        path: "list",
        element: <UserPage />,
      },
      {
        path: "edit/:id",
        element: <UserEditForm />,
      },
    ],
  },
  {
    path: "trainers",
    children: [
      {
        index: true,
        element: <TrainerList />,
      },
      {
        path: "add",
        element: <TrainerAddForm />,
      },
      {
        path: "edit/:id",
        element: <TrainerEditForm />,
      },
    ],
  },
  {
    path: "reviews",
    element: <ReviewList />,
  },
  {
    path: "enrollments",
    element: <EnrollmentList />,
  },
];

export default adminDashboardRoutes;
