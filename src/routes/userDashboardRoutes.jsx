// src/routes/UserRoutes.js
import CourseList from "../features/courses/CoursesList";
import CourseDetail from "../features/courses/CourseDetail";
import ReviewList from "../features/reviews/ReviewsList";
import AddReviewForm from "../features/reviews/AddReviewForm";
import TrainerList from "../features/trainers/TrainerList"; // View Trainer List

const UserRoutes = () => [
  {
    path: "courses/list",
    element: <CourseList />,
  },
  {
    path: "courses/:id",
    element: <CourseDetail />,
  },
  {
    path: "reviews/list",
    element: <ReviewList />,
  },
  {
    path: "reviews/add",
    element: <AddReviewForm />,
  },
  {
    path: "trainers/list",
    element: <TrainerList />,
  },
];

export default UserRoutes;
