import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../components/BookCard";
import ReviewCard from "../components/ReviewCard";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:7000/api/feed";

const FeedPage = () => {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookPage, setBookPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books?page=${bookPage}`);
      if (res.data.books.length === 0) {
        setHasMoreBooks(false);
      } else {
        setBooks((prev) => [...prev, ...res.data.books]);
        setBookPage(res.data.nextPage);
      }
    } catch (err) {
      setError("Failed to load books");
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews?page=${reviewPage}`);
      if (res.data.reviews.length === 0) {
        setHasMoreReviews(false);
      } else {
        setReviews((prev) => [...prev, ...res.data.reviews]);
        setReviewPage(res.data.nextPage);
      }
    } catch (err) {
      setError("Failed to load reviews");
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([fetchBooks(), fetchReviews()]);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong");
      }
    };
    loadInitialData();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-white">Loading feed...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-5 bg-gray-900 min-h-screen text-white">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-5">Book Feed</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Books Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Books</h2>
          <InfiniteScroll
            dataLength={books.length}
            next={fetchBooks}
            hasMore={hasMoreBooks}
            loader={<h4 className="text-center">Loading more books...</h4>}
            className="space-y-4"
          >
            {console.log(books)}
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </InfiniteScroll>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Reviews</h2>
          <InfiniteScroll
            dataLength={reviews.length}
            next={fetchReviews}
            hasMore={hasMoreReviews}
            loader={<h4 className="text-center">Loading more reviews...</h4>}
            className="space-y-4"
          >
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;