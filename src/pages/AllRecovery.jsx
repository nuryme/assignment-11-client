import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from './Loading';
import useAuthHook from '../hooks/useAuthHook';
import axios from 'axios';

const AllRecovery = () => {
    const { user } = useAuthHook();
    const queryClient = useQueryClient();
  
    const {
      data: items,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["recovery"],
      queryFn: async () => {
        return await axios
          .get(`${import.meta.env.VITE_URL}/recovery/${user.email}`)
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
        <h1 className="mb-12 text-center">Recovered Items</h1>
        <div className="overflow-x-auto">
          {items.length > 0 ? (
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
          ) : (
            <h1 className="text-center text-red-500">No Data Found</h1>
          )}
        </div>
        </div>
  
    );
};

export default AllRecovery;