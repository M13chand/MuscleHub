// src/routes/CourseRoutes.js
import AddCourseForm from "../features/courses/AddCourseForm";
import EditCourseForm from "../features/courses/EditCourseForm";
import CourseList from "../features/courses/CoursesList";
import CourseDetail from "../features/courses/CourseDetail";

const CourseRoutes = () => [
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
    element: <CourseDetail />,
  },
  {
    path: "list",
    element: <CourseList />,
  },
];

export default CourseRoutes;
