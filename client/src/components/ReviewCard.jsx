import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-white mb-2">{review.bookTitle}</h3>
      <p className="text-gray-300 text-sm mb-3">{review.comment}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-500 text-sm font-medium">Rating: {review.rating}/5</span>
        <span className="text-gray-400 text-sm">{review.date}</span>
      </div>
    </div>
  );
};

// Example usage with hardcoded data
const ExampleReviewCard = () => {
  const exampleReview = {
    bookTitle: "The Great Gatsby",
    comment: "A captivating and timeless story of love and ambition.",
    rating: 5,
    date: "2025-01-22",
  };

  return <ReviewCard review={exampleReview} />;
};

export default ReviewCard;
export { ExampleReviewCard };
