import { useState } from "react";
import { Link } from "@remix-run/react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const userName = "John Doe"; // Replace with actual user name from your authentication logic

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-transparent text-white py-4 px-12 items-center flex justify-between fixed top-0 left-0 w-full z-50">
      <div>
        <span className="text-2xl font-bold">TazamaNasi</span>
      </div>
      <div className="flex flex-row space-x-10">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/discover" className="hover:text-gray-400">Discover</Link>
        <Link to="/movie-release" className="hover:text-gray-400">Movie Release</Link>
        <Link to="/forum" className="hover:text-gray-400">Forum</Link>
      </div>
      <div className="flex flex-row items-center space-x-6">
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-400 cursor-pointer" onClick={handleSearchClick} />
          {searchVisible && (
            <input
              type="text"
              className="w-48 p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
              placeholder="Search..."
            />
          )}
        </div>
        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle className="text-white text-3xl cursor-pointer" onClick={toggleDropdown} />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-semibold">{userName}</p>
                </div>
                <div className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
                  Logout
                </div>
                <div className="p-4 cursor-pointer hover:bg-gray-100">
                  Settings
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="text-white border-2 border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition duration-300" onClick={handleLogin}>
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="w-20 h-10 bg-green-800 text-white rounded-lg hover:bg-green-700 transition duration-300" onClick={handleLogin}>
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;