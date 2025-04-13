import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const AllItems = () => {
  const all = true;

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allItems"],
    queryFn: async () => {
      return await axios
        .get(`${import.meta.env.VITE_URL}/items?all=${all}`)
        .then((res) => res.data);
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return toast.error("Something wrong");
  }

  return (
    <div className="max_width mt-6">
      <h1 className="mb-12 text-center">Lost/Found Items</h1>

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
                className="mt-3 block w-full py-1.5 text-center text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
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
