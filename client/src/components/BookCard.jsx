import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/3">
            <img
              src={book.coverImage}
              alt={`${book.name} cover`}
              className="w-full h-auto object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
              style={{ maxWidth: "240px", maxHeight: "340px" }} // Set max width and height
            />
          </div>

          {/* Details Section */}
          <div className="p-6 flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {book.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-semibold">Year:</span> {book.year}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>

            {/* Rating Section */}
            <div className="flex items-center mb-4">
              <span className="text-gray-600 dark:text-gray-400 mr-2 font-semibold">
                Rating:
              </span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={index < book.rating ? "#FFD700" : "#E5E7EB"}
                    className="w-5 h-5 transition-transform transform hover:scale-110"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex space-x-4">
              <button className="flex-1 py-2 px-4 bg-blue-500 dark:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-900 focus:ring-opacity-75">
                Write Review
              </button>
              <button className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-opacity-75">
                Read Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
