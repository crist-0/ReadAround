import React, { useEffect, useState } from "react";
import { Star, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ReviewCard = ({ review }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentUserData, setCommentUserData] = useState({});
  const navigate = useNavigate();

  const log_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetchUserData();
    fetchComments();
  }, [review.user_id, review.review_id]);

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

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:7000/api/review/${review.review_id}/comments`
      );
      const commentsData = response.data.data;

      // Fetch user details for each comment
      const usersMap = {};
      const userPromises = commentsData.map(async (comment) => {
        if (!usersMap[comment.user_id]) {
          try {
            const userResponse = await axios.get(
              `http://127.0.0.1:7000/api/user/details?id=${comment.user_id}`
            );
            usersMap[comment.user_id] = userResponse.data.user;
          } catch (err) {
            console.error(`Failed to fetch user data for ID ${comment.user_id}`, err);
            usersMap[comment.user_id] = { username: "Unknown User" }; // Fallback
          }
        }
        return { ...comment, user: usersMap[comment.user_id] };
      });

      const resolvedComments = await Promise.all(userPromises);
      setComments(resolvedComments);
      setCommentUserData(usersMap);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  const handleUsernameClick = () => {
    if (userData) {
      navigate("/view-user", { state: { user_data: userData } });
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      await axios.post(
        `http://127.0.0.1:7000/api/review/${review.review_id}/comments`,
        { user_id: log_id, content: commentText },
        { headers: { "Content-Type": "application/json" } }
      );
      setCommentText("");
      fetchComments(); // Refresh comments after adding
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i + 1 <= rating ? "text-yellow-400" : "text-gray-500"}`}
        fill={i + 1 <= rating ? "#facc15" : "none"}
        stroke={i + 1 <= rating ? "#facc15" : "#9ca3af"}
      />
    ));
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
          {console.log(review)}
          <span className="text-gray-400 text-sm">{format(new Date(review.date || review.updated_at), "yyyy-MM-dd HH:mm")}</span>
        </div>
      </div>

      {/* Add Comment Section */}
      <button
        className="mt-4 text-blue-400 hover:text-blue-300 flex items-center"
        onClick={() => setShowCommentForm(!showCommentForm)}
      >
        {showCommentForm ? <ChevronUp /> : <ChevronDown />} Add a Comment
      </button>
      {showCommentForm && (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
          ></textarea>
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={handleAddComment}
          >
            Submit
          </button>
        </div>
      )}

      {/* View Comments Section */}
      <button
        className="mt-4 text-green-400 hover:text-green-300 flex items-center"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? <ChevronUp /> : <ChevronDown />} View Comments
      </button>
      {showComments && (
        <div className="mt-2 p-2 border border-gray-600 rounded bg-gray-700">
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-600 pb-1 mb-1"
              >
                <p className="text-gray-300 text-sm">{c.comment}</p>
                <button
                  className="text-blue-400 text-xs ml-4 hover:text-blue-300"
                  onClick={() =>
                    navigate("/view-user", { state: { user_data: commentUserData[c.user_id] } })
                  }
                >
                  {commentUserData[c.user_id]?.username || "Loading..."}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
