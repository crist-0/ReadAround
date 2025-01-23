import React from "react";

const Header = () => {
  return (
    <header >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-bold text-slate-200">
        ReadAround
        </div>

        {/* Navigation Links */}
        <nav className="text-lg hidden md:flex space-x-6">
          <a href="#features" className="text-slate-300 border-0 hover:text-blue-500">
            Features
          </a>
          <a href="#books" className="text-slate-300 hover:text-blue-500">
            Popular Books
          </a>
          <a href="#testimonials" className="text-slate-300 hover:text-blue-500">
            Reviews
          </a>
          <a href="#contact" className="text-slate-300 hover:text-blue-500">
            Contact
          </a>
        </nav>

        {/* Call-to-Action Button */}
        <div className="flex flex-row text=xl">
        <button className="hidden md:block bg-blue-500 text-slate-100 px-4 py-2 rounded hover:bg-blue-600 mr-3">
          Sign Up
        </button>
        <button className="hidden md:block bg-blue-400 text-slate-100 px-4 py-2 rounded hover:bg-blue-600">
          Log In
        </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

