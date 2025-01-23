import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.newPassword || !formData.oldPassword) {
      setError("All fields are required.");
      setMessage("");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setMessage("");
      return;
    }

    try {
      // API call to reset password using Axios
      const response = await axios.post("http://127.0.0.1:7000/api/reset_password", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle success
      setMessage(response.data.message);
      setError("");

      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle errors from the server or network
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Failed to reset password. Please try again.");
      } else {
        console.log(error);
        setError("Something went wrong. Please try again.");
      }
      setMessage("");
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow border bg-gray-800 border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Reset Password
          </h1>
          {message && (
            <div className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-900">
              {message}
            </div>
          )}
          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-900">
              {error}
            </div>
          )}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-purple-800"
            >
              Reset Password
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full bg-gray-300 text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
