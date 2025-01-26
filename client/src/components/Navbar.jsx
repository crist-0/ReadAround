import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    // Navigate to the home page or login page
    navigate('/login');
  };

  const toggleMenu = () => {
    const menu = document.getElementById('navbarNav');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  return (
    <nav className=" shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-slate-200">
          ReadAround
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>

        </button>

        {/* Nav Links */}
        <div
          id="navbarNav"
          className="hidden md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <Link
                to="/"
                className="text-slate-200 hover:text-sky-300 transition duration-200"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                to="/dashboard"
                className="text-slate-200 hover:text-sky-300 transition duration-200"
              >
                Dashboard
              </Link>
            </li> */}
            <li>
              <Link
                to="/profile"
                className="text-slate-200 hover:text-sky-300 transition duration-200"
              >
                Profile
              </Link>
            </li>
            {isLoggedIn ? (
              <>
              <li>
              <Link
                to="/dashboard"
                className="text-slate-200 hover:text-sky-300 transition duration-200"
              >
                Dashboard
              </Link>
            </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-slate-200 hover:text-red-500 transition duration-200 focus:outline-none"
                  >
                  Logout
                </button>
              </li>
                </>
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    className="text-slate-200 hover:text-sky-300 transition duration-200"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-slate-200 hover:text-sky-300 transition duration-200"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
