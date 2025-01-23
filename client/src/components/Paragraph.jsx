import React from "react";

const Paragraph = ({ review, rating }) => {
  return (
    <div className="bg-gray-900 p-6 lg:p-16 md:p-14">
      <div className="bg-gray-800 p-6 lg:p-8 md:p-7 rounded-lg shadow-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-6">
          User Review and Rating
        </h2>

        {/* Review Section */}
        <p className="mb-5 text-lg leading-relaxed text-gray-400">{review}</p>

        {/* Rating Section */}
        <div className="flex items-center">
          <span className="text-lg text-gray-400 mr-3">Rating:</span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={index < rating ? "#FFD700" : "#E5E7EB"}
                className="w-6 h-6 transition-transform transform hover:scale-110"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paragraph;
