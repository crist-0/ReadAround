// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReviewCard from "../components/ReviewCard"; // Ensure this is the correct path to your ReviewCard component
// import { useLocation } from "react-router-dom";

// const ReviewDisplay = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user_id, setId] = useState("");
//   const [user_data, setUser] = useState({ 
//     id: "",
//     username: "",
//     email: "",
//     phone: ""
//    })
//   const location = useLocation();
//   const { book_id , book_title} = location.state || {};

//   console.log(book_title,book_id);
//   // Fetch reviews from the backend
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:7000/api/review/get?bid="+book_id); // Replace with your backend endpoint
//         setReviews(response.data.data);
//         console.log(reviews);
//       } catch (err) {
//         setError("Failed to load reviews. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <div className="text-center text-gray-500 mt-10">Loading reviews...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-10">{error}</div>;
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen py-10 px-5">
//       <h1 className="text-3xl font-bold text-white text-center mb-10">{ book_title }</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reviews.map((review, index) => (
//           <ReviewCard key={index} review={review} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewDisplay;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard"; // Ensure correct path
import { useLocation } from "react-router-dom";

const ReviewDisplay = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const { book_id, book_title } = location.state || {};

  console.log("Book Details:", book_title, book_id);

  // Fetch reviews from backend
  useEffect(() => {
    if (!book_id) {
      setError("Book ID is missing. Cannot fetch reviews.");
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:7000/api/review/get?bid=${book_id}`);
        console.log(response.data);
        setReviews(response.data.data || []);
      } catch (err) {
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); // ✅ Added `book_id` as a dependency

  // Debugging: Log reviews when they change
  useEffect(() => {
    console.log("Fetched Reviews:", reviews);
  }, [reviews]);

  if (loading) {
    console.log("Book Details:", book_title, book_id);
    return <div className="text-center text-gray-500 mt-10">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-5">
      <h1 className="text-3xl font-bold text-white text-center mb-10">{book_title || "Book Reviews"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => <ReviewCard key={index} review={review} />)
        ) : (
          <p className="text-center text-gray-400 col-span-full">No reviews available for this book.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewDisplay;
