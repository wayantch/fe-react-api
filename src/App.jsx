import { Link } from "react-router-dom";

// Import routes
import Routes from "./routes";
import { useState } from "react";

export default function App() {
  // State untuk toggle menu pada perangkat mobile
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk toggle menu mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-gray-900 p-4 shadow-lg px-20">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo / Home link */}
            <Link to="/" className="text-white text-2xl font-semibold">
              <span className="text-blue-500">My</span>App
            </Link>

            {/* Button hamburger untuk mobile */}
            <button
              onClick={toggleMenu}
              className="text-gray-400 lg:hidden focus:outline-none"
              type="button"
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            {/* Links untuk desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                to="/card"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                CARD
              </Link>
              <Link
                to="/posts"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                POSTS
              </Link>
            </div>
          </div>

          {/* Menu toggle untuk mobile */}
          <div
            className={`lg:hidden ${isOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-gray-800 p-4`}
          >
            <Link
              to="/cards"
              className="block text-gray-300 hover:text-white py-2 transition duration-300"
            >
              CARD
            </Link>
            <Link
              to="/posts"
              className="block text-gray-300 hover:text-white py-2 transition duration-300"
            >
              POSTS
            </Link>
          </div>
        </nav>
      </div>

      <Routes />
    </>
  );
}
