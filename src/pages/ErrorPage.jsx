import { ArrowPathIcon, ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    // console.error(error);
  
    // Determine error message and status
    const errorMessage = error.statusText || error.message || 'An unexpected error occurred';
    const errorStatus = error.status || '';
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">Oops!</h1>
          <p className="mt-2 text-gray-600">Sorry, an unexpected error has occurred.</p>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-800">
              {errorStatus && (
                <span className="font-semibold">{errorStatus} - </span>
              )}
              <span className="italic">{errorMessage}</span>
            </p>
          </div>
  
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <HomeIcon className="-ml-1 mr-2 h-5 w-5" />
              Return Home
            </Link>
            
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" />
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
};

export default ErrorPage;