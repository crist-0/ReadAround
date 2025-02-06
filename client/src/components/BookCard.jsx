import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const BookCard = ({ book }) => {

    const [bookCover, setBookCover] = useState();

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
