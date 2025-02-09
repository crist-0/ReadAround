import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import { CohereClientV2 } from 'cohere-ai';

const cohere_api_key = import.meta.env.VITE_API_KEY;

const cohere = new CohereClientV2({
  token: cohere_api_key,
});



const BookCard = ({ book }) => {

    const [bookCover, setBookCover] = useState();
    const [generatedReview, setGeneratedReview] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const q = `?book_title=${book.title}s&author_name=${book.author}`;
    const formattedQuery = q.replace(/(\w)([A-Z])/g, '$1+$2').toLowerCase();

    const fetchCover = async () => {
      try{
        const response = await axios.get("https://bookcover.longitood.com/bookcover"+formattedQuery);
        setBookCover(response.data.url);
      }
      catch(error)
      {
        console.log("error during fetching book cover ",error);
      }
    }

    useEffect(
        () => {
          fetchCover();
        }
    ,[])
  const formattedDate = new Date(book.publication_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const navigate = useNavigate();

  const handleWriteNavigation = () => {
    navigate("/add-review", {
      state: {
        book_id: book.id,
      },
    });
  };

  const handleAddToReadingList = async () => {
    // Add logic to handle adding the book to the reading list
    console.log(`Book with ID ${book.id} added to the reading list.`);
    const user_id = localStorage.getItem("user_id");
    console.log(book);
    const data = {
      book_id: book.id || book._id,
      user_id: user_id
    }

    try {
      const response = await axios.post("http://127.0.0.1:7000/api/add/saved", data);
 
      alert(response.data.message);

      // localStorage.setItem("user_id", response.data.user.id);
      
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
      console.error(err);
    }
  };

  const handleRead = () => {
    navigate("/view-reviews", {
      state: {
        book_id: book.id || book._id,
        book_title: book.title
      },
    });
  }

  const handleGenerateReview = async () => {
    setGeneratedReview("");
    setIsGenerating(true);

    try {
      const response = await cohere.chat({
        model: "command-r-plus-08-2024",
        messages: [
          {
            role: "user",
            content: `Write a brief review for the book titled "${book.title}" by ${book.author}.`,
          },
        ],
        endpoint: "https://api.cohere.com/v2/chat",
      });

      const fullReview =
        response?.message?.content[0]?.text || "No review generated.";
      setIsGenerating(false);

      // Typing effect: Display the review character by character
      let currentIndex = 0;
      const interval = setInterval(() => {
        setGeneratedReview((prev) => prev + fullReview[currentIndex]);
        currentIndex++;
        if (currentIndex >= fullReview.length) {
          clearInterval(interval);
        }
      }, 30); // Adjust interval speed (30ms for faster typing effect)
    } catch (error) {
      console.error("Error generating review:", error);
      console.log(error);
      setGeneratedReview("Failed to generate review. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={bookCover || book.cover_image}
              alt={`${book.title} cover`}
              className="w-full md:w-auto h-auto object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
              style={{ width: "100%", maxWidth: "240px", aspectRatio: "2/3" }}
            />
          </div>


          {/* Details Section */}
          <div className="p-6 flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {book.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <span className="font-semibold">Publication Date:</span> {formattedDate}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <span className="font-semibold">Author:</span> {book.author}
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
                    fill={index < book.average_rating ? "#FFD700" : "#E5E7EB"}
                    className="w-5 h-5 transition-transform transform hover:scale-110"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex space-x-4 mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleRead}>
                Read Reviews
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={handleWriteNavigation}
              >
                Write Reviews
              </button>
            </div>

            {/* Add to Reading List Button */}
            <div className="mt-6">
              <button
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={handleAddToReadingList}
              >
                Add to Reading List
              </button>
            </div>
           
{/* Generate Review Button */}
<div className="mt-6">
              <button
                className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                onClick={handleGenerateReview}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Review"}
              </button>
            </div>

            {/* Generated Review with Typing Effect */}
            {generatedReview && (
              <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Generated Review:</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {generatedReview}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookCard;
