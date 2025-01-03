import { useState } from "react";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useLoaderData();

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
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
        <div className="relative">
          <div className="flex flex-row items-center space-x-2">
          <FaUserCircle className="text-white text-3xl cursor-pointer" onClick={toggleDropdown} />
          <span className="ml-2">{user?.user_metadata?.name}</span>
          </div>
         
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100">
                Settings
              </div>
              <Form method="post" action="/logout">
                <button type="submit" className="w-full text-left p-4 cursor-pointer hover:bg-gray-100 transition duration-300">
                  Logout
                </button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;