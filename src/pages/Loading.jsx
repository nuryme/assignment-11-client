import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-285px)] flex flex-col items-center justify-center bgPrimary">
      <div className="text-center space-y-4">
        {/* Spinner animation */}
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-semibold text-gray-700">
          Loading Stories
        </h2>
        <p className="text-gray-500">
          Please wait while we fetch the latest success stories
        </p>

        {/* Optional progress bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-blue-500 animate-pulse"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>

      {/* Optional skeleton loader */}
      <div className="mt-8 w-full max-w-md space-y-4">
        <div className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
