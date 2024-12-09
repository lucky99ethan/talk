import { useState } from "react";
import { Link } from "@remix-run/react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
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
        <Link to="/signup">
          <button className="text-white border-2 border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition duration-300">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="w-20 h-10 bg-green-800 text-white rounded-lg hover:bg-green-700 transition duration-300">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;