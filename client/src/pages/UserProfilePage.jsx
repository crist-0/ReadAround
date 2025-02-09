import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Import the BookCard component
import BookCard from "../components/BookCard";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [reviewDetails, setReviewDetails] = useState([]);
  
  const { state } = useLocation();
  const { user_data } = state;

  const log_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (log_id === user_data.id) {
      navigate("/dashboard");
    }
  }, [log_id, user_data.id, navigate]);
  
  useEffect(() => {
    const fetchBookDetails = async () => {
      const book_data = user_data.saved_books;
      try {
        const bookRequests = book_data.map((bookId) =>
          axios.get(`http://127.0.0.1:7000/api/books/${bookId}`)
        );
        const responses = await Promise.all(bookRequests);
        const books = responses.map((response) => response.data.data);
        setBookDetails(books);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    const fetchReviewDetails = async () => {
      const user_id = user_data.id;
      try {
        const response = await axios.get(
          `http://127.0.0.1:7000/api/review/get?id=${user_id}`
        );
        setReviewDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching review details:", error);
      }
    };


    fetchBookDetails();
    fetchReviewDetails();
    checkFollowingStatus();
  }, [user_data.saved_books, user_data.id, log_id]);

  const checkFollowingStatus = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:7000/api/social/check",
        {
          follower: log_id,
          following: user_data.id,
        }
      );
      console.log(response.data.message);
      if (response.data.message == "Already following") {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };
  
  const handleFollow = async () => {
    try {
      if (!isFollowing) {
        await axios.post("http://127.0.0.1:7000/api/social/follow", {
          follower: log_id,
          following: user_data.id,
        });
        setIsFollowing(true);
      } else {
        await axios.delete("http://127.0.0.1:7000/api/social/unfollow", {
          data: { follower: log_id, followed: user_data.id },
        });
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };
  

  const handleRedirect = () => {
    navigate("/");
  };

  const redirectDashboard = () => {
    navigate("/dashboard");
  }

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
              className={`w-32 py-2 rounded-lg text-sm font-medium ${
                isFollowing ? "bg-gray-500" : "bg-blue-600"
              } text-white hover:bg-blue-700 focus:outline-none`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          {/* Saved Books Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Saved Books
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
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
          
          {/* Star Rating Display */}
          <div className="flex items-center mb-2 text-2xl">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-500"}>
                {i < review.rating ? "★" : "☆"}
              </span>
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
            className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-8 hover:bg-blue-700"
          >
            Go to HomePage
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;