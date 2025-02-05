import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Analytics from "../components/Analytics";
import axiosInstance from "../axiosInstance";

const AdminPanel = () => {
  const [organisers, setOrganisers] = useState([]);
  const [selectedUserReviews, setSelectedUserReviews] = useState([]);
  const [selectedReviewComments, setSelectedReviewComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrganisers = async () => {
      try {
        const response = await axiosInstance.get("/admin/organisers");
        setOrganisers(response.data.reverse());
      } catch (err) {
        setError("Failed to fetch Users");
      }
    };
    fetchOrganisers();
  }, []);

  //fetch reviews

  const fetchUserReviews = async (userId) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:7000/api/review/get/?id=${userId}`
      );
      setSelectedUserReviews(response.data.data);
      setShowReviews(true);
    } catch (err) {
      setError("Failed to fetch reviews for the selected user.");
    }
  };


  //fetch comments

  const fetchReviewComments = async (reviewId) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:7000/api/review/${reviewId}/comments`
      );
      setSelectedReviewComments(response.data.data);
    } catch (err) {
      setError("Failed to fetch comments for the selected review.");
    }
  };


  //delete a review

  
  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`http://localhost:7000/api/review/${reviewId}`);
      setSuccess("Review deleted successfully.");
      setSelectedUserReviews((prev) =>
        prev.filter((review) => review._id !== reviewId)
      );
    } catch (err) {
      setError("Failed to delete review.");
    }
  };

  // delete a comment

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(
        `http://localhost:7000/api/comment/${commentId}`
      );
      setSuccess("Comment deleted successfully.");
      setSelectedReviewComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      setError("Failed to delete comment.");
    }
  };


  const handleToggleVerification = async (id, isVerified) => {
    try {
      await axiosInstance.patch(`/admin/organisers/${id}/verify`);
      setSuccess(`User ${isVerified ? "unverified" : "verified"} successfully`);

      setOrganisers(
        organisers.map((org) =>
          org._id === id ? { ...org, isVerified: !org.isVerified } : org
        )
      );
    } catch (err) {
      setError(`Failed to ${isVerified ? "unverify" : "verify"} User`);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 lg:p-16 md:p-14">
    <h2 className="text-3xl font-bold text-center mb-8">Admin Panel</h2>
    {error && <div className="bg-red-600 text-white p-4 mb-4 rounded-lg">{error}</div>}
    {success && <div className="bg-green-600 text-white p-4 mb-4 rounded-lg">{success}</div>}

    <Analytics organisers={organisers} />

    <div className="bg-gray-800 p-6 lg:p-8 md:p-7 rounded-lg shadow-lg">
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-4 text-gray-400">Username</th>
            <th className="p-4 text-gray-400">Email</th>
            <th className="p-4 text-gray-400">Status</th>
            <th className="p-4 text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {organisers.map((org) => (
            <tr
              key={org._id}
              className="border-b border-gray-700 hover:bg-gray-700"
            >
              <td className="p-4">{org.username}</td>
              <td className="p-4">{org.email}</td>
              <td className="p-4">{org.isVerified ? "Verified" : "Unverified"}</td>
              <td className="p-4 flex space-x-2">
                <button
                  className={`py-2 px-4 rounded-lg text-sm ${
                    org.isVerified
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={() =>
                    handleToggleVerification(org._id, org.isVerified)
                  }
                >
                  {org.isVerified ? "Unverify" : "Verify"}
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                  onClick={() => fetchUserReviews(org._id)}
                >
                  View Reviews
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {showReviews && (
      <div className="mt-10 bg-gray-800 p-6 lg:p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6">User Reviews</h3>
        {console.log(selectedUserReviews)}
        {selectedUserReviews.map((review) => (
          <div key={review.review_id} className="mb-6">
            <p className="text-lg mb-2">{review.comment}</p>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded-lg mr-2"
              onClick={() => fetchReviewComments(review.review_id)}
            >
              View Comments
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
              onClick={() => handleDeleteReview(review.review_id)}
            >
              Delete Review
            </button>
          </div>
        ))}
      
        {selectedReviewComments.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xl font-bold mb-4">Comments</h4>
            {selectedReviewComments.map((comment) => (
              <div key={comment._id} className="mb-4">
                <p className="text-sm">{comment.text}</p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete Comment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
  );
};

export default AdminPanel;
