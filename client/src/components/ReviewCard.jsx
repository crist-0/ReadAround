import React, { useEffect, useState } from "react";
import { Star, Calendar } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ReviewCard = ({ review }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:7000/api/user/details?id=${review.user_id}`
        );
        setUserData(response.data.user);
      } catch (err) {
        setError("Failed to load user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [review.user_id]);

  const handleUsernameClick = () => {
    if (userData) {
      navigate("/view-user", {
        state: { user_data: userData },
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-500'}`}
          fill={i <= rating ? "#facc15" : "none"}
          stroke={i <= rating ? "#facc15" : "#9ca3af"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      {loading ? (
        <p className="text-gray-400">Loading user data...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <h3
          className="text-white text-lg font-semibold cursor-pointer hover:text-purple-400"
          onClick={handleUsernameClick}
        >
          {userData?.username}
        </h3>
      )}
      <p className="text-gray-300 text-base mt-2">{review.comment}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400 w-5 h-5" />
          <span className="text-gray-400 text-sm">{format(new Date(review.date), "yyyy-MM-dd HH:mm")}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
