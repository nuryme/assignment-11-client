import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import useAuthHook from "../hooks/useAuthHook";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuthHook();
  const [startDate, setStartDate] = useState(new Date());
  const [item, setItem] = useState({});
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/item/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const openModal = () => {
    document.body.classList.add("overflow-hidden");
    document.getElementById("my_modal_1").showModal();
  };

  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    document.getElementById("my_modal_1").close();
  };

  const { isError, isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      // console.log(data)
      return await axios.post(`${import.meta.env.VITE_URL}/recovery`, data).then(res => res.data)
    },
    onSuccess: (data) => {
     if(data.insertedId) {
      toast.success('Item Recovered Successfully')
      navigate('/allItems')
      queryClient.invalidateQueries({queryKey: ['recovery']})
     }
    },
    onError: (err) => {
      toast.error(err.message)
    }
    
    
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    const { _id, ...recoverItem } = item;
    const recoveredInformation = {
      ...recoverItem,
      recoverId: id,
      data,
      recoveryDate: startDate,
      recovererName: user?.displayName,
      recovererEmail: user?.email,
      recovererPhoto: user?.photoURL,
    };
    // console.log(recoveredInformation)

    if(user?.email === item.authorEmail) {
      return toast.error('Both are the same person')
    }

    await mutateAsync(recoveredInformation)
  };


  if (isError) {
    return toast.error("Something wrong");
  }

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="mb-12 text-center">Item Details</h1>

      <div className="bgPrimary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-80 w-full">
          <img
            src={item.image || "/default-item.jpg"}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-medium ${
              item.postType === "Lost"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {item.postType}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              {item.title}
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Category: {item.category}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />
              <p>Location: {item.location}</p>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              <span>
                {item.postType === "Lost" ? "Lost on: " : "Found on: "}
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-400" />
              <p>Posted by <span className="font-bold">{item.authorName}</span></p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-400" />
              <p>Email: <span className="font-bold">{item.authorEmail}</span></p>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-red-500 text-lg">{item.status}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button disabled={item.status === 'Recovered' ? true : false} className="primaryBtn disabled:cursor-not-allowed" onClick={openModal}>
              {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
            </button>
          </div>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button> */}
      <dialog id="my_modal_1" className="modal overflow-hidden">
        <div className="modal-box">
          <h3 className="font-bold text-center">Congratulation 👏</h3>
          <div className="modal-action block">
            <form method="dialog" onSubmit={handleSubmit} className="space-y-4">
              {/* Recovered Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recovered Location *
                </label>
                <input
                  type="text"
                  name="recoveryLocation"
                  placeholder="Where was the item returned?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Recovery Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recovery Date *
                </label>
                <DatePicker
                  name="recoveryDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Recovered By (Readonly) */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Recovered By
                </h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-900 font-medium">
                      {user?.displayName}
                    </p>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                  </div>
                  
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={closeModal}
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {
                    isPending ? 'Submitting' : 'Submit Recovery'
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PostDetails;
