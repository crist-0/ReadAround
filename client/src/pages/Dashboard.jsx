// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Assuming we have these components in our project
// import BookCard from "../components/BookCard";
// import ReviewCard from "../components/ReviewCard";
// import RecommendationCard from "../components/RecommendationCard";

// const Dashboard = () => {
//   // State management for different aspects of the dashboard
//   const [userData, setUserData] = useState({
//     username: "",
//     readingGoal: 0,
//     booksReadThisYear: 0,
//     favoriteGenres: []
//   });
  
//   const [recentBooks, setRecentBooks] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [recentReviews, setRecentReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Authentication required. Please log in.");
//           setLoading(false);
//           return;
//         }

//         // Fetch all required data in parallel for better performance
//         const [userResponse, booksResponse, recommendationsResponse, reviewsResponse] = 
//           await Promise.all([
//             axios.get("http://127.0.0.1:7000/api/user/dashboard", {
//               headers: { Authorization: `Bearer ${token}` }
//             }),
//             axios.get("http://127.0.0.1:7000/api/books/recent", {
//               headers: { Authorization: `Bearer ${token}` }
//             }),
//             axios.get("http://127.0.0.1:7000/api/recommendations", {
//               headers: { Authorization: `Bearer ${token}` }
//             }),
//             axios.get("http://127.0.0.1:7000/api/reviews/recent", {
//               headers: { Authorization: `Bearer ${token}` }
//             })
//           ]);

//         setUserData(userResponse.data.user);
//         setRecentBooks(booksResponse.data.books);
//         setRecommendations(recommendationsResponse.data.recommendations);
//         setRecentReviews(reviewsResponse.data.reviews);
//       } catch (err) {
//         setError("Failed to load dashboard data. Please try again.");
//         console.error("Dashboard data fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // Calculate reading progress percentage
//   const readingProgress = userData.readingGoal 
//     ? Math.round((userData.booksReadThisYear / userData.readingGoal) * 100)
//     : 0;

//   return (
//     <section className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {loading ? (
//           <div className="flex justify-center items-center min-h-[400px]">
//             <div className="loader bg-gray-200 p-4 rounded-full w-16 h-16 animate-spin"></div>
//           </div>
//         ) : error ? (
//           <div className="p-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900">
//             {error}
//           </div>
//         ) : (
//           <>
//             {/* Header Section */}
//             <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
//               <h1 className="text-2xl font-bold text-white mb-4">
//                 Welcome back, {userData.username}!
//               </h1>
              
//               {/* Reading Progress */}
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold text-white mb-2">Reading Goal Progress</h2>
//                 <div className="w-full bg-gray-700 rounded-full h-4">
//                   <div 
//                     className="bg-blue-600 rounded-full h-4 transition-all duration-500"
//                     style={{ width: `${Math.min(readingProgress, 100)}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-gray-400 mt-2">
//                   {userData.booksReadThisYear} of {userData.readingGoal} books read this year ({readingProgress}%)
//                 </p>
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="bg-gray-700 p-4 rounded-lg">
//                   <h3 className="text-white font-semibold">Favorite Genres</h3>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {userData.favoriteGenres.map((genre, index) => (
//                       <span 
//                         key={index}
//                         className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
//                       >
//                         {genre}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Main Content Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Recently Read Books */}
//               <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
//                 <h2 className="text-xl font-semibold text-white mb-4">Recently Read</h2>
//                 <div className="space-y-4">
//                   {recentBooks.map(book => (
//                     <BookCard key={book.id} book={book} />
//                   ))}
//                   <button
//                     onClick={() => navigate("/books/reading-history")}
//                     className="w-full text-blue-500 hover:text-blue-400 text-sm font-medium"
//                   >
//                     View Full Reading History →
//                   </button>
//                 </div>
//               </div>

//               {/* Personalized Recommendations */}
//               <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
//                 <h2 className="text-xl font-semibold text-white mb-4">Recommended For You</h2>
//                 <div className="space-y-4">
//                   {recommendations.map(recommendation => (
//                     <RecommendationCard key={recommendation.id} recommendation={recommendation} />
//                   ))}
//                   <button
//                     onClick={() => navigate("/recommendations")}
//                     className="w-full text-blue-500 hover:text-blue-400 text-sm font-medium"
//                   >
//                     See More Recommendations →
//                   </button>
//                 </div>
//               </div>

//               {/* Recent Reviews */}
//               <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 lg:col-span-2">
//                 <h2 className="text-xl font-semibold text-white mb-4">Your Recent Reviews</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {recentReviews.map(review => (
//                     <ReviewCard key={review.id} review={review} />
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => navigate("/reviews/my-reviews")}
//                   className="w-full text-blue-500 hover:text-blue-400 text-sm font-medium mt-4"
//                 >
//                   View All Your Reviews →
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Dashboard;


///// Hardcoded values

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showPopup, setShowPopup] = useState(null);
  const user_id = localStorage.getItem("user_id");

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const [recommendations, setRecommendations] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const log_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:7000/api/user/details?id=${user_id}`);
        setDashboardData(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user details.", error);
      }
    };



    fetchUserData();
  }, [user_id]);

  useEffect(() => {
    if (dashboardData?.saved_books) {
      const fetchSavedBooks = async () => {
        try {
          const bookPromises = dashboardData.saved_books.map((bookId) =>
            axios.get(`http://127.0.0.1:7000/api/books/${bookId}`)
          );
          const books = await Promise.all(bookPromises);
          setSavedBooks(books.map((res) => res.data.data));
        } catch (error) {
          console.error("Failed to fetch saved books.", error);
        }
      };
      fetchSavedBooks();
      fetchRecommendations();
    }
  }, [dashboardData]);

  //fetching reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:7000/api/review/get?id=${user_id}`);
      setReviews(response.data.data);
    } catch (error) {
      console.error("Failed to fetch reviews.", error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/recs/", {
        books: dashboardData.saved_books,
      });
      setRecommendations(response.data);
      const bookRequests = Object.values(response.data.book_id).map((bookId) =>
        axios.get(`http://127.0.0.1:7000/api/books/${bookId}`)
      );
      const bookResponses = await Promise.all(bookRequests);
      const books = bookResponses.map((response) => response.data.data);
      setRecommendedBooks(books);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {


    fetchReviews();
  }, [user_id]);


  // Social 

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const [followersRes, followingRes] = await Promise.all([
          axios.get(`http://127.0.0.1:7000/api/social/${user_id}/followers`),
          axios.get(`http://127.0.0.1:7000/api/social/${user_id}/following`),
        ]);
    
        const followerIds = followersRes.data.data.map((item) => item.follower);
        const followingIds = followingRes.data.data.map((item) => item.following);
    
        const uniqueFollowerIds = [...new Set(followerIds)];
        const uniqueFollowingIds = [...new Set(followingIds)];
    
        const uniqueUserIds = [...new Set([...uniqueFollowerIds, ...uniqueFollowingIds])];
    
        const userPromises = uniqueUserIds.map((id) =>
          axios.get(`http://127.0.0.1:7000/api/user/details?id=${id}`)
        );
        const users = await Promise.all(userPromises);
    
        const userMap = users.reduce((acc, res) => {
          acc[res.data.user.id] = res.data.user.username;
          return acc;
        }, {});
    
        setFollowers(filterUsers(uniqueFollowerIds, userMap));
        setFollowing(filterUsers(uniqueFollowingIds, userMap));
      } catch (error) {
        console.error("Failed to fetch social data.", error);
      }
    };
    
    const filterUsers = (userIds, userMap) => {
      return userIds.map((id) => ({
        id,
        username: userMap[id],
      }));
    };
    
    
    fetchSocialData();
  }, [user_id]);

  const handleFollowToggle = async (targetUserId, isFollowing) => {
    try {

      const action = isFollowing ? "unfollow" : "follow";

      isFollowing ? (
        await axios.delete(`http://127.0.0.1:7000/api/social/unfollow`, {
         data: { 
          follower: user_id,
          followed: targetUserId
         }
        })
      )
      : (
        await axios.post(`http://127.0.0.1:7000/api/social/follow`, {
         follower: user_id,
        followed_id: targetUserId,
        })
      )

      setFollowing((prev) =>
        isFollowing ? prev.filter((user) => user.id !== targetUserId) : [...prev, { id: targetUserId, username: "" }]
      );
    } catch (error) {
      console.error("Error toggling follow state", error);
    }
  };

  // editing the review
  const handleEditClick = (review) => {
    setEditingReviewId(review.review_id);
    setEditedText(review.text); // Assuming review has a `text` field
    setEditedRating(review.rating);
  };

  // saving the edited review
const handleSaveClick = async (reviewId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:7000/api/review/${reviewId}`, {
        text: editedText,
        rating: editedRating,
      });

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.review_id === reviewId
              ? { ...review, text: editedText, rating: editedRating }
              : review
          )
        );
        setEditingReviewId(null);
        fetchReviews();
      }
    } catch (error) {
      console.error("Error updating review:", error.response?.data || error.message);
    }
  };

// delete a review
const handleDeleteClick = async (reviewId) => {
  if (window.confirm("Are you sure you want to delete this review?")) {
    try {
      // API call to delete the review
      await axios.delete(`http://localhost:7000/api/review/${reviewId}`);
      
      // Remove the review from the reviews state
      setReviews((prevReviews) => prevReviews.filter((review) => review.review_id !== reviewId));
      
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete the review. Please try again.");
    }
  }
};

// delete a book from the saved list
const handleDeleteBook = async (bookId) => {
  if (window.confirm("Are you sure you want to remove this book from your saved list?")) {
    try {
      // API call to delete the book
      await axios.delete("http://localhost:7000/api/delete/saved", {
        data: { book_id : bookId, user_id: log_id }, // Sending bookId in the request body
      });

      // Update the state to remove the deleted book from the savedBooks list
      setSavedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));

      alert("Book removed successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to remove the book. Please try again.");
    }
  }
};

const handleUsernameClick = async (userId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:7000/api/user/details?id=${userId}`);
    const userData = response.data.user;
    
    if (userData) {
      navigate("/view-user", { state: { user_data: userData } });
    }
  } catch (error) {
    console.error("Failed to fetch user data.", error);
  }
};


  if (!dashboardData) {
    return <div className="text-center text-gray-500 mt-10">Loading user data...</div>;
  }




  return (
    <section className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-4">Welcome back, {dashboardData.username || "User"}!</h1>
          <div className="flex justify-between text-white">
            <button onClick={() => setShowPopup("followers")}>
              Followers: {followers.length}
            </button>
            <button onClick={() => setShowPopup("following")}>
              Following: {following.length}
            </button>
          </div>
        </div>

  {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 max-w-md">
      <h2 className="text-xl text-white mb-4 text-center">
        {showPopup === "followers" ? "Followers" : "Following"}
      </h2>
      <ul className="space-y-3 max-h-60 overflow-y-auto">
        {(showPopup === "followers" ? followers : following).map((user) => (
          <li 
            key={user.id} 
            className="flex justify-between items-center text-white bg-gray-700 p-2 rounded-lg"
          >
            <span 
              className="text-base cursor-pointer hover:underline" 
              onClick={() => handleUsernameClick(user.id)}
            >
              {user.username}
            </span>
            {showPopup === "following" && (
              <button
                onClick={() => handleFollowToggle(user.id, true)}
                className="bg-red-500 hover:bg-red-600 text-white text-base px-3 py-1 rounded-lg"
              >
                Unfollow
              </button>
            )}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => setShowPopup(null)} 
        className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm"
      >
        Close
      </button>
    </div>
  </div>
)}

    <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Saved Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {savedBooks.length > 0 ? (
            savedBooks.map((book) => (
              <div key={book.id} className="border p-4 rounded-lg bg-gray-800">
                <BookCard book={book} />
                <button
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-200 ease-in-out"
                  onClick={() => handleDeleteBook(book.id)}
                  >
                  Delete Book
              </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No saved books yet.</p>
          )}
        </div>
      </div>

     {/* Recommendations Section */}
     <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Recommended Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
              {recommendedBooks.length ? (
                recommendedBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))
              ) : (
                <p className="text-gray-400">No recommendations available.</p>
              )}
            </div>
          </section>

          <div className="mb-6">
  <h2 className="text-xl font-semibold text-white mb-4">Your Reviews</h2>
  <div className="space-y-4">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div key={review.review_id} className="border p-4 rounded-lg bg-gray-800">
          {editingReviewId === review.review_id ? (
            <div>
              {/* Editable Textarea for Review */}
              <textarea
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              
              {/* Editable Rating Input */}
              <div className="mt-2">
                <label className="text-white mr-2">Rating:</label>
                <select
                  className="bg-gray-700 text-white p-1 rounded"
                  value={editedRating}
                  onChange={(e) => setEditedRating(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} ⭐
                    </option>
                  ))}
                </select>
              </div>

              {/* Save & Cancel Buttons */}
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => handleSaveClick(review.review_id)}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded mt-2 ml-2"
                onClick={() => setEditingReviewId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <ReviewCard review={review} />
              <div className="mt-2">
                <button
                  className="text-blue-400 hover:underline mr-4"
                  onClick={() => handleEditClick(review)}
                >
                  Edit
                </button>
                <button
                  className="text-red-400 hover:underline"
                  onClick={() => handleDeleteClick(review.review_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-400">No reviews yet.</p>
    )}
  </div>
</div>

     
      </div>
    </section>
  );
};

export default Dashboard;
