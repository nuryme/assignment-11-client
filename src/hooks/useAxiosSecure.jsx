import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthHook from "./useAuthHook";
import { useEffect } from "react";

 const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true
})


const useAxiosSecure = () => {

  const navigate = useNavigate()
  const {handleLogOut} = useAuthHook()


  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        if(err.status === 401 || err.status === 403) {
          handleLogOut()
          .then(() => {
            navigate('/login')
            // toast.error(err.message)
          }
          )
          .catch(err => console.log(err))
        }

        return Promise.reject(err)
      }
      
      
    )
  }
  , [handleLogOut, navigate])

  return axiosInstance
};

export default useAxiosSecure;
