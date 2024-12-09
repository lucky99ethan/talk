import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

interface Movie {
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

const Upcoming = () => {
  const [upcomingList, setUpcomingList] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const getUpcoming = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=1911927029d548114049751dcaf5dbb0"
    )
      .then((res) => res.json())
      .then((json) => setUpcomingList(json.results));
  };

  useEffect(() => {
    getUpcoming();
  }, []);

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < upcomingList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = upcomingList.slice(startIndex, endIndex);

  return (
    <div className="bg-black text-white py-4 px-6 relative">
      <h1 className="text-2xl font-bold mb-4">Upcoming Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((movie) => (
          <div
            key={movie.poster_path}
            className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div
              className="bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
                height: "300px",
              }}
            ></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.original_title}</h2>
              <div className="text-sm text-gray-400 flex flex-row space-x-2">
                <p>{movie.release_date}</p>
                <FaStar className="text-yellow-400" />
                <p>{movie.vote_average}</p>
                <p>•</p>
                <p>{movie.vote_count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentPage > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
          onClick={handlePrevPage}
        >
          <IoIosArrowDropleftCircle size={30} />
        </button>
      )}
      {(currentPage + 1) * itemsPerPage < upcomingList.length && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
          onClick={handleNextPage}
        >
          <IoIosArrowDroprightCircle size={30} />
        </button>
      )}
    </div>
  );
};

export default Upcoming;