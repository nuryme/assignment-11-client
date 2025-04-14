import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import useAuthHook from "../hooks/useAuthHook";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaList, FaTh } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AllRecovery = () => {
  const { user } = useAuthHook();
  const axiosSecure = useAxiosSecure();
  const [layoutMode, setLayoutMode] = useState("table");

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recovery"],
    queryFn: async () => {
      return await axiosSecure
        .get(`${import.meta.env.VITE_URL}/recovery/${user?.email}`)
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
      <Helmet>
        <title>Recovered Items | Home</title>
      </Helmet>

      <h1 className="mb-12 text-center">Recovered Items</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setLayoutMode(layoutMode === "card" ? "table" : "card")
          }
          className=""
        >
          {layoutMode === "card" ? <FaList></FaList> : <FaTh></FaTh>}
        </button>
      </div>

      {/* <div className="overflow-x-auto"> */}
      {layoutMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className=" bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4"
            >
              {/* Card content */}
              <div className="flex mb-4">
                <div className="relative h-64 w-full">
                  <img
                    src={item.image || "/default-item.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold bg-red-500 text-white`}
                  >
                    Before
                  </span>
                </div>
                <div className="relative h-64 w-full">
                  <img
                    src={item.recovererPhoto || "/default-item.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold bg-red-500 text-white`}
                  >
                    After
                  </span>
                </div>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Who Found</th>
              <th>Whose</th>
              <th>Recovered location</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {items.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.authorName}</td>
                <td>{item.recovererName}</td>
                <td>{item.data.recoveryLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    // </div>
  );
};

export default AllRecovery;
