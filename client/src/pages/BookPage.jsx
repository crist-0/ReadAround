import React, {useState,useEffect} from "react";
import BookCard from "../components/BookCard"; // Assuming BookCard is in the same directory
import { useLocation } from "react-router-dom";
import axios from "axios";

const BookPage = () => {
  const location = useLocation();
  const book = location.state?.book;
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [errorReviews, setErrorReviews] = useState(null);
  const [errorRecs, setErrorRecs] = useState(null);

  console.log("book id = "+book.id);
  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/recs/", {
          books: [book.id],
        });
        setRecommendations(response.data);

        const bookRequests = Object.values(response.data.book_id).map((bookId) =>
          axios.get(`http://127.0.0.1:7000/api/books/${bookId}`)
        );
        const bookResponses = await Promise.all(bookRequests);
        const books = bookResponses.map((response) => response.data.data);
        setRecommendedBooks(books);
      } catch (error) {
        setErrorRecs("Error fetching recommendations.");
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoadingRecs(false);
      }
    };

    if (book?.id) {
      fetchRecommendations();
    }
  }, [book?.id]);
  
  if (!book) {
    return <p className="text-center text-gray-500">No book details available.</p>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BookCard book={book} />
        </div>

      {/* Recommendations Section */}
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Recommended Books</h2>
          {loadingRecs ? (
            <p className="text-gray-400">Loading recommendations...</p>
          ) : errorRecs ? (
            <p className="text-red-500">Error: {errorRecs}</p>
          ) : recommendedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {recommendedBooks.map((recBook) => (
                <BookCard key={recBook.id} book={recBook} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No recommendations available.</p>
          )}
        </div>

      </div>
      </div>
  );
};

export default BookPage;
