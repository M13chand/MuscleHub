import { useAddReviewMutation } from "./reviewApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddReviewForm = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const [addReview] = useAddReviewMutation();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit a review");
      return;
    }

    const formData = new FormData();
    formData.append("reviewText", reviewText);
    formData.append("rating", rating);
    if (beforeImage) formData.append("beforeImage", beforeImage);
    if (afterImage) formData.append("afterImage", afterImage);

    await addReview(formData);
    setReviewText("");
    setRating(5);
    setBeforeImage(null);
    setAfterImage(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">Add a Review</h2>
      <textarea
        className="w-full p-2 bg-gray-800 rounded"
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <div className="mt-2">
        <label className="block text-sm">Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 bg-gray-800 rounded w-full"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm">Before Image:</label>
        <input
          type="file"
          onChange={(e) => setBeforeImage(e.target.files[0])}
          className="p-2 bg-gray-800 rounded w-full"
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm">After Image:</label>
        <input
          type="file"
          onChange={(e) => setAfterImage(e.target.files[0])}
          className="p-2 bg-gray-800 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-yellow-500 text-gray-900 p-2 rounded w-full hover:bg-yellow-600">
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
