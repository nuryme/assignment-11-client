import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthHook from "../hooks/useAuthHook";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import UpdateItem from "./UpdateItem";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const MyItems = () => {
  const { user } = useAuthHook();
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();

  // console.log(modalRef)

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allItems"],
    queryFn: async () => {
      return await axiosSecure
        .get(`${import.meta.env.VITE_URL}/items/${user.email}`)
        .then((res) => res.data);
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: async (id) => {
      // console.log(data)
      return await axios
        .delete(`${import.meta.env.VITE_URL}/item/${id}`)
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      // console.log(data);
      if (data.deletedCount > 0) {
        toast.success("Deleted Successfully");
        queryClient.invalidateQueries({ queryKey: ["allItems"] });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return toast.error("Something wrong");
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id);
      }
    });
  };

  // console.log(items);
  return (
    <div className="max_width mt-6">
      <Helmet>
        <title>My Items | Home</title>
      </Helmet>

      <h1 className="mb-12 text-center">My Items</h1>
      <div className="overflow-x-auto">
        {items.length > 0 ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {items.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.status}</td>
                  <td className="flex items-center gap-4 text-xl">
                    <button
                      // to={`/updateItems/${item._id}`}
                      onClick={() => {
                        setSelectedItem(item);
                        setSelectedId(item._id);
                        document.getElementById("my_modal_4").showModal();
                      }}
                    >
                      <MdOutlineSystemUpdateAlt
                        title="Update"
                        className="text-green-600 cursor-pointer"
                      />
                    </button>
                    <RiDeleteBin6Line
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      title="Delete"
                      className="text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center text-red-500">No Data Found</h1>
        )}
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        open modal
      </button> */}
      <dialog ref={modalRef} id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <div className="modal-action block">
            <UpdateItem
              id={selectedId}
              item={selectedItem}
              modalRef={modalRef}
            ></UpdateItem>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyItems;
