import { useGetReviewsQuery, useDeleteReviewMutation } from "./reviewApiSlice";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

const ReviewList = () => {
  const { data: reviews, isLoading, error } = useGetReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
    }
  };

  if (isLoading) return <p>Loading reviews...</p>;
  // if (error) return <p>Error loading reviews</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">User Reviews</h2>
      {reviews?.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews?.map((review) => (
            <li
              key={review.id}
              className="bg-gray-800 text-white p-4 rounded-lg mb-4 shadow-lg">
              <p className="text-lg font-semibold">{review.user.username}</p>
              <p>⭐ {review.rating}/5</p>
              <p className="italic">{review.reviewText}</p>
              {review.beforeImage && (
                <img
                  src={review.beforeImage}
                  alt="Before"
                  className="w-24 h-24 mt-2"
                />
              )}
              {review.afterImage && (
                <img
                  src={review.afterImage}
                  alt="After"
                  className="w-24 h-24 mt-2"
                />
              )}
              {user && user.id === review.user.id && (
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-500 mt-2 hover:text-red-700">
                  <FaTrash />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
