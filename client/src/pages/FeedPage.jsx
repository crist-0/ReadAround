import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../components/BookCard";
import ReviewCard from "../components/ReviewCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:7000/api/feed";

const FeedPage = () => {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookPage, setBookPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  // Handle search
  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:7000/api/books/search?title=${term}`);
      setSearchResults(res.data.books);
    } catch (err) {
      setError("Failed to search books");
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchBooks();
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
      <div className="flex flex-col items-center pb-3">
        <button
          className="text-xl text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/explore")}
        >
          Explore by genre
        </button>
      </div>

      {/* Search Section */}
      <div className="mb-5">
        <input
          type="text"
          className="w-full p-3 bg-gray-600 rounded-lg text-black"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="bg-white text-black rounded-lg mt-2 p-2 max-h-60 overflow-y-auto shadow-lg">
            {searchResults.map((book) => (
              <div
                key={book.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/bookpage`, { state: { book } })}
              >
                {book.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* Books Section */}
        <h2 className="text-xl font-semibold mb-3 text-center">Books</h2>
        <InfiniteScroll
          dataLength={books.length}
          next={fetchBooks}
          hasMore={hasMoreBooks}
          loader={<h4 className="text-center">Loading more books...</h4>}
          className="space-y-4"
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default FeedPage;
