import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

interface Series {
  poster_path: string;
  name: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  id: number;
}

const Series = () => {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const getSeries = () => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=1911927029d548114049751dcaf5dbb0"
    )
      .then((res) => res.json())
      .then((json) => setSeriesList(json.results));
  };

  useEffect(() => {
    getSeries();
  }, []);

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < seriesList.length) {
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
  const currentItems = seriesList.slice(startIndex, endIndex);

  return (
    <div className="bg-black text-white py-4 px-6 relative">
      <h1 className="text-2xl font-bold mb-4">Popular Series</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((series) => (
          <div
            key={series.id}
            className="rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div
              className="bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${series.poster_path})`,
                height: "300px",
              }}
            ></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{series.name}</h2>
              <div className="text-sm text-gray-400 flex flex-row space-x-2">
                <p>{series.first_air_date}</p>
                <FaStar className="text-yellow-400" />
                <p>{series.vote_average}</p>
                <p>•</p>
                <p>{series.vote_count}</p>
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
      {(currentPage + 1) * itemsPerPage < seriesList.length && (
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

export default Series;