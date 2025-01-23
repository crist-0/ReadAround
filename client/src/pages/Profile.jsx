// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Profile = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     favoriteGenres: [],
//     reviews: [],
//   });
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user data from API (Replace with actual API call)
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:7000/api/user/profile", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setUserData(response.data);
//       } catch (error) {
//         setError("Failed to fetch user data. Please try again.");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = () => {
//     // Clear user session (if any) and navigate to login
//     setMessage("Logging out...");
//     setTimeout(() => {
//       navigate("/login");
//     }, 2000);
//   };

//   return (
//     <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
//       <div className="w-full max-w-3xl rounded-lg shadow border bg-gray-800 border-gray-700">
//         <div className="p-6 space-y-6 sm:p-8">
//           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//             Welcome, {userData.username || "User"}!
//           </h1>
//           {message && (
//             <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-900">
//               {message}
//             </div>
//           )}
//           {error && (
//             <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900">
//               {error}
//             </div>
//           )}
//           <div className="space-y-4">
//             <div>
//               <h2 className="text-lg font-medium text-gray-900 dark:text-white">Profile Details</h2>
//               <p className="text-sm text-gray-400">Email: {userData.email}</p>
//               <p className="text-sm text-gray-400">Phone: {userData.phone}</p>
//             </div>
//             <div>
//               <h2 className="text-lg font-medium text-gray-900 dark:text-white">Favorite Genres</h2>
//               {userData.favoriteGenres.length > 0 ? (
//                 <ul className="list-disc list-inside text-sm text-gray-400">
//                   {userData.favoriteGenres.map((genre, index) => (
//                     <li key={index}>{genre}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-400">No favorite genres added.</p>
//               )}
//             </div>
//             <div>
//               <h2 className="text-lg font-medium text-gray-900 dark:text-white">Your Reviews</h2>
//               {userData.reviews.length > 0 ? (
//                 <ul className="space-y-2">
//                   {userData.reviews.map((review, index) => (
//                     <li
//                       key={index}
//                       className="p-4 bg-gray-700 rounded-lg shadow border border-gray-600"
//                     >
//                       <h3 className="text-md font-medium text-gray-200">
//                         {review.bookTitle}
//                       </h3>
//                       <p className="text-sm text-gray-400">{review.comment}</p>
//                       <p className="text-sm text-yellow-400">Rating: {review.rating}/5</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-400">No reviews added.</p>
//               )}
//             </div>
//           </div>
//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               onClick={() => navigate("/edit-profile")}
//               className="bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Edit Profile
//             </button>
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="bg-red-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import jwt from "jsonwebtoken";
// import axios from "axios";

// const UserProfile = () => {
//   const [userData, setUserData] = useState({
//     username: "dsg",
//     email: "sg",
//     phone: "2352562",
//     favoriteGenres: ["Fantasy", "Science Fiction", "Mystery"],
//     reviews: [
//       {
//         bookTitle: "The Hobbit",
//         comment: "An amazing journey through Middle-earth!",
//         rating: 5,
//       },
//       {
//         bookTitle: "1984",
//         comment: "A chilling depiction of a dystopian future.",
//         rating: 4,
//       },
//       {
//         bookTitle: "The Catcher in the Rye",
//         comment: "A thought-provoking story of adolescence.",
//         rating: 4,
//       },
//     ],
//   });

//   useEffect(async () =>{
//       const token = localStorage.getItem("token");
//       const id = jwt.decode(token);
//       console.log(id);

//       const response = await axios.get("http://127.0.0.1:7000/api/user/details");
//       console.log(response);
//   }, [])


//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setMessage("Logging out...");
//     setTimeout(() => {
//       navigate("/login");
//     }, 2000);
//   };

//   return (
//     <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-4xl rounded-lg shadow-lg border bg-gray-800 border-gray-700 overflow-hidden">
//         <div className="p-6 sm:p-8">
//           <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-center">
//             Welcome, {userData.username || "User"}!
//           </h1>
//           {message && (
//             <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-900">
//               {message}
//             </div>
//           )}
//           {error && (
//             <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900">
//               {error}
//             </div>
//           )}

//           <div className="space-y-6 ">
//             <div className="bg-gray-700 p-4 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold text-white">Profile Details</h2>
//               <p className="text-sm text-gray-400">Email: {userData.email}</p>
//               <p className="text-sm text-gray-400">Phone: {userData.phone}</p>
//             </div>

//             <div className="bg-gray-700 p-4 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold text-white">Favorite Genres</h2>
//               {userData.favoriteGenres.length > 0 ? (
//                 <ul className="list-disc list-inside text-sm text-gray-400">
//                   {userData.favoriteGenres.map((genre, index) => (
//                     <li key={index}>{genre}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-400">No favorite genres added.</p>
//               )}
//             </div>

//             <div className="bg-gray-700 p-4 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold text-white">Your Reviews</h2>
//               {userData.reviews.length > 0 ? (
//                 <ul className="space-y-4">
//                   {userData.reviews.map((review, index) => (
//                     <li
//                       key={index}
//                       className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-600"
//                     >
//                       <h3 className="text-md font-medium text-white">
//                         {review.bookTitle}
//                       </h3>
//                       <p className="text-sm text-gray-400">{review.comment}</p>
//                       <p className="text-sm text-yellow-400">Rating: {review.rating}/5</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-400">No reviews added.</p>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
//             <button
//               type="button"
//               onClick={() => navigate("/edit-profile")}
//               className="w-full sm:w-auto bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Edit Profile
//             </button>
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="w-full sm:w-auto bg-red-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UserProfile;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import UserCard from "../components/UserCard";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const decodedToken = jwt.decode(token).id;
        console.log(decodedToken); // Optional: Log decoded token for debugging

        const response = await axios.get("http://127.0.0.1:7000/api/user/details?id="+decodedToken, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data.user);
        setUserData(response.data.user);
      } catch (err) {
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    setMessage("Logging out...");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-lg shadow-lg border bg-gray-800 border-gray-700 overflow-hidden">
        <div className="p-6 sm:p-8">
          {loading ? (
            // Loader while data is being fetched
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="loader bg-gray-200 p-4 rounded-full w-16 h-16 animate-spin"></div>
            </div>
          ) : error ? (
            // Error message if fetching fails
            <div className="p-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900">
              {error}
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-white text-center py-2">
                Welcome, {userData.username || "User"}!
              </h1>
              {message && (
                <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-900">
                  {message}
                </div>
              )}

              <div className="space-y-6 ">

                <UserCard user={userData.username}/>
                <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-white">Profile Details</h2>
                  <p className="text-sm text-gray-400">userid: {userData.id}</p>
                  <p className="text-sm text-gray-400">Email: {userData.email}</p>
                  <p className="text-sm text-gray-400">Phone: {userData.phone}</p>
                </div>



              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/edit-profile")}
                  className="w-full sm:w-auto bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/reset")}
                  className="w-full sm:w-auto bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Reset Password
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full sm:w-auto bg-red-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;


