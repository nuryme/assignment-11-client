import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const AllItems = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const all = true;
  const queryClient = useQueryClient()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 500);

    return () => clearTimeout(timer)
  }
  , [searchTerm])

  const {
    data: items,
    isLoading,
    isError,
    isSuccess,

  } = useQuery({
    queryKey: ["search", debouncedTerm],
    queryFn: async () => {
      return await axios
        .get(`${import.meta.env.VITE_URL}/items?all=${all}&search=${debouncedTerm}`)
        .then((res) => res.data);
    },
    keepPreviousData: true
  });

  if(isSuccess) {
    queryClient.invalidateQueries({queryKey: ['allItems']})
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return toast.error("Something wrong");
  }

  const searchClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="max_width mt-6">
      <h1 className="mb-12 text-center">Lost/Found Items</h1>

      <div className="relative mb-8 max-w-md mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items by title"
          className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        {
          searchTerm && <button onClick={searchClear} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
          <FaTimes />
        </button>
        }
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64 w-full">
              <img
                src={item.image || "/default-item.jpg"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
                  item.postType === "Lost"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {item.postType}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>

              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-gray-400" />
                  <span className="truncate">Location: {item.location}</span>
                </div>

                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1 text-gray-400" />
                  <span>
                    {item.postType === "Lost" ? "Lost on: " : "Found on: "}
                    {new Date(item?.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span>Category: {item.category}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-red-500 text-lg">
                    {item.status}
                  </span>
                </div>
              </div>

              <Link
                to={`/items/${item._id}`}
                className="mt-4 inline-block w-full primaryBtn transition-colors"
                >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
