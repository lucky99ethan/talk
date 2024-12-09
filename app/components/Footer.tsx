import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-white py-10">
       {/* Bottom Divider */}
       <hr className="border-gray-700 mb-8" />
       <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        {/* Left Section */}
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Our platform provides the best and most up-to-date movie selections,
            ensuring an unmatched experience for movie enthusiasts everywhere.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center md:items-center">
          <nav className="flex space-x-6 text-sm font-semibold uppercase text-gray-400 mb-4">
            <a href="/" className="hover:text-white transition duration-300">
              Home
            </a>
            <a
              href="/discover"
              className="hover:text-white transition duration-300"
            >
              Discovery
            </a>
            <a
              href="/influence"
              className="hover:text-white transition duration-300"
            >
              Influence
            </a>
            <a
              href="/release"
              className="hover:text-white transition duration-300"
            >
              Release
            </a>
          </nav>
          <p className="text-gray-400 text-sm">
            &copy; 2024 TazamaNasi. All rights reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition duration-300"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <FaFacebook size={28} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <FaTwitter size={28} />
            </a>
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
