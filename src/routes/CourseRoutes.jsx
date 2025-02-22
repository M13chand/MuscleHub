// src/routes/CourseRoutes.js
import AddCourseForm from "../features/courses/AddCourseForm";
import EditCourseForm from "../features/courses/EditCourseForm";
import CourseList from "../features/courses/CoursesList";

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
    path: "list",
    element: <CourseList />,
  },
];

export default CourseRoutes;
