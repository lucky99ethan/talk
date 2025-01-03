import { useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { FaSearch } from "react-icons/fa";

const Navbars = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const { user } = useLoaderData();

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
        <div className="flex items-center space-x-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">Login</Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbars;