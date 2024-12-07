const Browse = () => {
  return (
    <div className="bg-black text-white h-auto w-full p-8 bg-red-600">
      <div className="max-w-xl mx-auto ml-0">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Star Wars: The Force Awakens</h1>
        </div>
        <div className="flex flex-row space-x-2 text-gray-400 mb-4">
          <p>2h 40min</p>
          <p>•</p>
          <p>2022</p>
          <p>• Fantasy</p>
          <p>• Action</p>
        </div>
        <div className="mb-6">
          <p className="text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe quae quod, molestiae illo eligendi, beatae repellendus voluptate fugiat numquam praesentium vitae quam quisquam? Suscipit enim deleniti ipsa tempora voluptates molestiae.
          </p>
        </div>
        <div className="flex flex-row space-x-4">
          <button className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-300">Watch Trailer</button>
          <button className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300">Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
};

export default Browse;