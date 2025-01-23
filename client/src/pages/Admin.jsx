import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Analytics from "../components/Analytics";
import axiosInstance from "../axiosInstance";

const AdminPanel = () => {
  const [organisers, setOrganisers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      {error && (
        <div className="bg-red-600 text-white p-4 mb-4 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-600 text-white p-4 mb-4 rounded-lg">
          {success}
        </div>
      )}

      {/* Business Analytics Section */}
      <Analytics organisers={organisers} />

      <div className="bg-gray-800 p-6 lg:p-8 md:p-7 rounded-lg shadow-lg">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-4 text-gray-400">Username</th>
              <th className="p-4 text-gray-400">Email</th>
              <th className="p-4 text-gray-400">Status</th>
              <th className="p-4 text-gray-400">Action</th>
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
                <td className="p-4">
                  {org.isVerified ? "Verified" : "Unverified"}
                </td>
                <td className="p-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
