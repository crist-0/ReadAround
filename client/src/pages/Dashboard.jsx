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

import React from "react";
import { useNavigate } from "react-router-dom";

// Assuming we have these components in our project
import BookCard from "../components/BookCard";
import ReviewCard from "../components/ReviewCard";

const Dashboard = () => {
  const navigate = useNavigate();

  // Hardcoded data
  const userData = {
    username: "JaneDoe",
    readingGoal: 20,
    booksReadThisYear: 12,
    favoriteGenres: ["Fantasy", "Science Fiction", "Mystery"],
  };

  const recentBooks = [
    {
      id: 1,
      name: "The Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
      genre: "Fantasy",
      coverImage: "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Dune",
      author: "Frank Herbert",
      year: 1965,
      genre: "Science Fiction",
      coverImage: "https://miro.medium.com/v2/resize:fit:1000/1*cvZY5-RIAnblTFmZVqDvew.png",
      rating: 4.5,
    },
    {
      id: 3,
      name: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      year: 2005,
      genre: "Mystery",
      coverImage: "https://cdn.moviefone.com/image-assets/15472/j4Ra0SvYM08winX6fxn6AknlygV.jpg?d=360x540",
      rating: 4,
    },
  ];
  

  const recommendations = [
    { id: 1, title: "The Martian", author: "Andy Weir" },
    { id: 2, title: "Ready Player One", author: "Ernest Cline" },
    { id: 3, title: "The Alchemist", author: "Paulo Coelho" },
  ];

  const recentReviews = [
    { 
      user_id : "678cb0cf94cac820baf06c4c",
      username: "BilboBaggins", 
      comment: "An amazing journey through Middle Earth!", 
      rating: 5, 
      date: "2025-01-26T17:30:46.040+00:00" 
    },
    { 
      user_id : "678cb0cf94cac820baf06c4c",
      username: "MuadDib", 
      comment: "A masterpiece of science fiction.", 
      rating: 5, 
      date: "2025-01-26T17:30:46.040+00:00" 
    },
    { 
      user_id : "678cb0cf94cac820baf06c4c",
      username: "HoldenCaulfield", 
      comment: "A deep dive into teenage angst.", 
      rating: 4, 
      date: "2025-01-26T17:30:46.040+00:00" 
    }
  ];
  

  // Calculate reading progress percentage
  const readingProgress = userData.readingGoal
    ? Math.round((userData.booksReadThisYear / userData.readingGoal) * 100)
    : 0;

  return (
    <section className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-4">
            Welcome back, {userData.username}!
          </h1>

          {/* Reading Progress */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white mb-2">Reading Goal Progress</h2>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-600 rounded-full h-4 transition-all duration-500"
                style={{ width: `${Math.min(readingProgress, 100)}%` }}
              ></div>
            </div>
            <p className="text-gray-400 mt-2">
              {userData.booksReadThisYear} of {userData.readingGoal} books read this year ({readingProgress}%)
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-white font-semibold">Favorite Genres</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.favoriteGenres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recently Read Books */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Recently Read</h2>
            <div className="space-y-4">
              {recentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
              <button
                onClick={() => navigate("/books/reading-history")}
                className="w-full text-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                View Full Reading History →
              </button>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Recommended For You</h2>
            <div className="space-y-4">
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-white font-semibold">{recommendation.title}</h3>
                    <p className="text-gray-400 text-sm">{recommendation.author}</p>
                  </div>
                  <button
                    className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                    onClick={() => navigate(`/books/${recommendation.id}`)}
                  >
                    Details →
                  </button>
                </div>
              ))}
              <button
                onClick={() => navigate("/rec")}
                className="w-full text-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                See More Recommendations →
              </button>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">Your Recent Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <button
              onClick={() => navigate("/reviews/my-reviews")}
              className="w-full text-blue-500 hover:text-blue-400 text-sm font-medium mt-4"
            >
              View All Your Reviews →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
