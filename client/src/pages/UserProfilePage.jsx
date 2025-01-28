import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';

// Import the BookCard component
import BookCard from "../components/BookCard";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [reviewDetails, setReviewDetails] = useState([]);
  
  const user = {
    name: "John Doe",
    username: "johndoe",
  };

  // Get the location object which contains the state
  const { state } = useLocation();
  const { user_data } = state;

  // Fetching book details whenever saved_books change
  useEffect(() => {
    const fetchBookDetails = async () => {
      const book_data = user_data.saved_books;

      try {
        const bookRequests = book_data.map((bookId) =>
          axios.get(`http://127.0.0.1:7000/api/books/${bookId}`)
        );

        const responses = await Promise.all(bookRequests);
        const books = responses.map((response) => response.data.data);
        setBookDetails(books);  // Update state with the fetched books
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const fetchReviewDetails = async () => {
      const user_id = user_data.id;

      try {
        const response = await axios.get(`http://127.0.0.1:7000/api/review/get?id=${user_id}`);
        setReviewDetails(response.data.data);  // Update state with fetched reviews
      } catch (error) {
        console.error('Error fetching review details:', error);
      }
    };

    fetchBookDetails();
    fetchReviewDetails();
  }, [user_data.saved_books, user_data.id]);

  const handleFollow = () => {
    setIsFollowing((prevState) => !prevState);
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl rounded-lg shadow border bg-gray-800 border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            {user_data.username}'s Profile
          </h1>
          <p className="text-gray-400 text-center">Email : {user_data.email}</p>
          <p className="text-gray-400 text-center">Phone : {user_data.phone}</p>

          {/* Follow Button */}
          <div className="text-center mt-4">
            <button
              onClick={handleFollow}
              className={`w-32 py-2 rounded-lg text-sm font-medium ${isFollowing ? "bg-gray-500" : "bg-blue-600"} text-white hover:bg-blue-700 focus:outline-none`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          {/* Saved Books Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Saved Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
              {/* Check if there are any saved books */}
              {bookDetails.length ? (
                bookDetails.map((book) => <BookCard key={book.id} book={book} />)
              ) : (
                <p className="text-gray-400">No saved books yet.</p>
              )}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Reviews</h2>
            {reviewDetails.length ? (
              <div className="space-y-4">
                {reviewDetails.map((review) => (
                  <div
                    key={review.review_id}
                    className="bg-gray-700 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {review.bookTitle}
                    </h3>
                    <div className="flex items-center text-yellow-500 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 .587l3.668 7.568L24 9.753l-6 5.847 1.415 8.4L12 19.897l-7.415 3.903L6 15.6 0 9.753l8.332-1.598L12 .587z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Reviewed on {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </section>

          <button
            onClick={handleRedirect}
            className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-8 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Go to HomePage
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
