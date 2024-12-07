const ContinueWatching = () => {
    return (
      <div className="bg-black text-white py-4 px-6">
        <h2 className="text-xl font-bold mb-4">Continue Watching</h2>
        <div className="flex space-x-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer">
            <img
              src="https://via.placeholder.com/150"
              alt="Avatar"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">AVATAR</h3>
              <p className="text-gray-400">The Way of the Water</p>
              <div className="flex items-center text-gray-400">
                <img
                  src="https://via.placeholder.com/20"
                  alt="Ikako.t"
                  className="w-5 h-5 rounded-full mr-2"
                />
                <span>Ikako.t</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContinueWatching;