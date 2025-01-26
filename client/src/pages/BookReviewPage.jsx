import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const BookReviewPage = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const { book_id } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookTitle || !reviewText) {
      setMessage("");
      setError("Please fill in all fields.");
      return;
    }

    const user_id = localStorage.getItem("user_id");

    const review = {
      title: bookTitle,
      review: reviewText,
      rating: parseInt(rating),
      book_id: book_id,
      user_id: user_id,
    };

    try {
      const response = await axios.post("http://localhost:7000/api/review/add", review, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setMessage("Thank you for your review!");
        setError("");
        setBookTitle("");
        setReviewText("");
        setRating(1);
      } else {
        setError("Something went wrong. Please try again.");
        setMessage("");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit the review. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Write a Book Review
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-2">
                Book Title
              </label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="w-full p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the book title"
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-2">
                Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="5"
                className="w-full p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your review here..."
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Math.min(5, Math.max(1, e.target.value)))}
                min="1"
                max="5"
                className="w-full p-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a rating from 1 to 5"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900"
            >
              Submit Review
            </button>
          </form>

          {message && (
            <p className="mt-6 text-green-500 font-semibold text-center">{message}</p>
          )}
          {error && (
            <p className="mt-6 text-red-500 font-semibold text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookReviewPage;
