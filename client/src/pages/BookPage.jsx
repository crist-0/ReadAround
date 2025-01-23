import React from "react";
import BookCard from "../components/BookCard"; // Assuming BookCard is in the same directory

const BookPage = () => {
  // Hardcoded book details
  const book = {
    coverImage:
      "https://cdn.penguin.co.in/wp-content/uploads/2024/05/9780143457534.jpg", // Public domain image of The Jungle Book cover
    name: "The Jungle Book",
    author: "Rudyard Kipling",
    year: 1894,
    genre: "Adventure, Children's Literature",
    rating: 5,
    description:
      "The Jungle Book is a classic tale of adventure and survival in the jungles of India, featuring Mowgli, a young boy raised by wolves, and his encounters with characters like Baloo the bear, Bagheera the panther, and Shere Khan the tiger.",
    reviews: [
      { text: "A timeless masterpiece that captivates readers of all ages.", author: "Emily" },
      { text: "The vivid descriptions make you feel like you're in the jungle.", author: "James" },
      { text: "A must-read for anyone who loves adventure and storytelling.", author: "Sophia" },
    ],
  };;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BookCard book={book} />
        </div>

        {/* Detailed Description Section */}
        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-4">About the Book</h2>
          <p className="text-gray-300 leading-relaxed">
            {book.description
              ? book.description
              : "No detailed description available for this book."}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Reviews</h2>
          <div>
            {book.reviews && book.reviews.length > 0 ? (
              <ul className="space-y-4">
                {book.reviews.map((review, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg shadow-md"
                  >
                    <p className="text-gray-300 mb-2">{review.text}</p>
                    <span className="text-gray-400 text-sm">
                      - {review.author}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No reviews available for this book.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
