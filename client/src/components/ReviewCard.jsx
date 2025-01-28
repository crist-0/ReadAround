import React, { useEffect, useState } from "react";
import { Star, Calendar } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const [data, setData] = useState({});
  let user_data = {};
  
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    // Navigate to '/view-user' and pass user_data in the state
    navigate('/view-user', {
      state: {
        user_data: {
          id: data.id,
          email: data.email,
          username: data.username,
          phone: data.phone,
          saved_books: data.saved_books
        }
      }
    });
  }

   useEffect( () => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7000/api/user/details?id="+review.user_id); // Replace with your backend endpoint
        user_data = response.data.user;
        // console.log(response.data.user);
        setData(response.data.user);
        console.log(data);
      } catch (err) {
        console.error("Failed to load reviews. Please try again later.");
        console.log(err);
      } finally {
        console.log("Completed");
      }
    }
      fetchUserData();
   }, []);

   return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 
        className="text-gray-200 text-lg font-semibold mb-2 cursor-pointer"
        onClick={handleUsernameClick} // Add onClick handler for the username
      >
        {data.username} {/* Display the reviewer's username */}
      </h3>
      <p className="text-gray-300 text-base mb-4">{review.comment}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-400 w-5 h-5" />
          <span className="text-yellow-400 text-sm font-medium">
            {review.rating}/5
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400 w-5 h-5" />
          <span className="text-gray-400 text-sm">{review.date}</span>
        </div>
      </div>
    </div>
  );
  
};


export default ReviewCard;
