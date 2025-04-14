import React, { useState } from "react";
import DatePicker from "react-datepicker";
import useAuthHook from "../hooks/useAuthHook";
import { useNavigate} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import toast from "react-hot-toast";

const UpdateItem = ({id, modalRef}) => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuthHook();
  // const { id } = useParams();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  // console.log(id)

  const { data: item, isLoading } = useQuery({
    queryKey: ["allItems", id],
    enabled: !!id,
    queryFn: async () => {
      return await axios
        .get(`${import.meta.env.VITE_URL}/item/${id}`)
        .then((res) => res.data);
    },
  });
// console.log(item)
  const { isError, isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      // console.log(data)
      return await axios.patch(`${import.meta.env.VITE_URL}/item/${id}`, data).then(res => res.data)
    },
    onSuccess: (data) => {
      // console.log(data)
     if(data.modifiedCount > 0) {
      toast.success('Item Updated')
      navigate('/myItems')
      queryClient.invalidateQueries({queryKey: ['allItems']})
      if(modalRef?.current) {
        modalRef?.current.close()
      }
     }
    },
    onError: (err) => {
      toast.error(err.message)
    }
    
    
  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const imageFile = formData.get('image')
    
    const imageFormData = new FormData()
    imageFormData.append('image', imageFile)
    
    const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imageFormData)
    const imageUrl = imgbbRes.data.data.url
    // console.log(imageUrl)
    
    const data = Object.fromEntries(formData.entries());
    data.date = startDate;
    data.image = imageUrl

    // console.log(data)

    await mutateAsync(data)



  };
// console.log(item)

if(isError) toast.error('Something Wrong')

if(isLoading) return <Loading></Loading>


  return (
    <div className="">
      <h1 className="mb-12 text-center">Update Items</h1>
      <form onSubmit={handleSubmit} method="dialog">
        {/* Post Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Type <span className="text-red-500 font-bold">*</span>
          </label>
          <select
            name="postType"
            defaultValue={item?.postType}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Post Type" disabled>
              Post Type
            </option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail (Image) <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={item?.title}
            placeholder="Brief description of the item"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500 font-bold">*</span>
          </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={item?.description}
            placeholder="Detailed description of the item, including any identifying features"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            name="category"
            defaultValue={item?.category}
            placeholder="Type a category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            name="location"
            defaultValue={item?.location}
            placeholder="Where was the item lost/found?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Lost/Found <span className="text-red-500 font-bold">*</span>
          </label>
          <DatePicker 
          method="dialog"
            name="date"
            defaultValue={new Date(item?.date).toLocaleDateString()}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Contact Information
          </h3>
          <div className="bgPrimary p-4 rounded-md">
            <div className="mb-2">
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <input
                type="text"
                name="authorName"
                value={user?.displayName}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                name="authorEmail"
                value={user?.email}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
        // onClick={document.getElementById("my_modal_4").close()}
          type="submit"
            disabled={isPending}
            className={`w-full py-2 px-4 rounded-md text-white font-medium cursor-pointer ${
              isPending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isPending ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
