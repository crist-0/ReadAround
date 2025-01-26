import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate , Link, data } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("http://127.0.0.1:7000/api/login", formData);
      setMessage(response.data.message);
      setError("");

      localStorage.setItem("user_id", response.data.user.id);
      
      // Store token in localStorage for future requests
      localStorage.setItem("token", response.data.token);

      // Redirect or take action after login
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else if (response.data.user.role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  const handleRedirect = () => {
    navigate("/");
  }

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow border bg-gray-800 border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login
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
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>

            <button
              onClick={handleRedirect}
              className="w-full bg-blue-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Go to HomePage
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
