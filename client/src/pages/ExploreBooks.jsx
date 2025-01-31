import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const ExploreBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [error, setError] = useState("");
  const genres = ["Fiction", "Non-Fiction", "Fantasy", "Mystery", "Science Fiction", "Adventure"];

  const fetchBooksByGenre = async (genre) => {
    try {
      setError(""); // Reset error before fetching
      const response = await axios.post(
        "http://localhost:7000/api/books/get",
        { genre },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // if (response.data && response.data.data) {
      //   console.log(response.data.data);
      //   setBooks(response.data.data);
      // } else {
      //   setError("No books found for the selected genre.");
      // }
      console.log(response.data.response);
      setBooks(response.data.response);

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Failed to fetch books.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchBooksByGenre(genre);
  };

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Explore Books by Genre</h1>

        {/* Genre Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`py-2 px-4 rounded-lg text-white font-semibold shadow-md transition-all 
                ${selectedGenre === genre ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900 text-center">
            {error}
          </div>
        )}

        {/* Book Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {console.log(books)}
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="text-gray-300 text-center col-span-full">
              {selectedGenre && !error
                ? "No books found for the selected genre."
                : "Select a genre to explore books."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreBooks;
