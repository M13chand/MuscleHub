import ReviewList from "../features/reviews/ReviewsList";
import AddReviewForm from "../features/reviews/AddReviewForm";

const ReviewRoutes = () => [
  {
    path: "list",
    element: <ReviewList />,
  },
  {
    path: "add",
    element: <AddReviewForm />,
  },
];

export default ReviewRoutes;
