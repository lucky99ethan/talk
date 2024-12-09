import { useEffect, useState } from "react";

interface Movie {
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

const Browse = () => {
  const [BrowseList, setBrowseList] = useState<Movie[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=1911927029d548114049751dcaf5dbb0"
    )
      .then((res) => res.json())
      .then((json) => setBrowseList(json.results));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BrowseList.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentMovie = BrowseList.length > 0 ? BrowseList[currentImageIndex] : null;
  const currentImage = currentMovie
    ? `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`
    : "";

  return (
    <div
      className="h-screen flex flex-col justify-end bg-center bg-cover relative z-40"
      style={{ backgroundImage: `url(${currentImage})` }}
      onClick={handleImageClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="relative z-10 text-white p-8 w-full">
        <div className="max-w-xl mx-auto ml-10">
          {currentMovie && (
            <>
              <div className="mb-6">
                <h1 className="text-5xl font-extrabold drop-shadow-md">
                  {currentMovie.original_title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center space-x-4 text-gray-300 mb-6">
                <p className="text-sm">{currentMovie.release_date}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <p>{currentMovie.vote_average}</p>
                </div>
                <p className="text-sm">• Fantasy</p>
                <p className="text-sm">• Action</p>
              </div>
              <div className="mb-8">
                <p className="text-lg leading-relaxed">
                  {currentMovie.overview}
                </p>
              </div>
            </>
          )}
          <div className="flex space-x-6">
            <button className="bg-green-500 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:bg-green-600 transition-all duration-300">
              Watch Trailer
            </button>
            <button className="bg-transparent border-2 border-white text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:bg-white hover:text-black transition-all duration-300">
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {BrowseList.slice(0, 7).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Browse;