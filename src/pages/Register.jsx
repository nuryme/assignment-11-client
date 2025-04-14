import React, { useState } from "react";
import registrationData from "../assets/lottie/registration.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";
import toast from "react-hot-toast";

const Register = () => {
  const { handleRegister, setUser, handleUpdate } = useAuthHook();
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    //   console.log(data)

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(data.password)) {
      setInvalid(true);
    }

    handleRegister(data.email, data.password)
      .then((res) => {
        handleUpdate(data.name, data.photo)
          .then(() => {
            // console.log("Profile Updated");
          })
          .catch((err) => toast.error(err.message));

        setUser(res.user);
        toast.success("Registration Successful", { icon: "👏" });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Register | Home</title>
      </Helmet>

      <h1 className=" text-center primaryColor">Please Register</h1>

      <div className="flex flex-row-reverse lg:flex-row justify-center gap-12">
        <div className="mb-8">
          <div style={{ width: "500px", height: "500px" }}>
            <Lottie
              animationData={registrationData}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="mt-10  min-w-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="register-username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                name="email"
                placeholder="Your Email"
                type="email"
                id="register-email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PhotoURL <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                name="photo"
                placeholder="Photo URL"
                type="url"
                id="register-email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                name="password"
                placeholder="Password"
                type="password"
                id="register-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {invalid && (
              <p className="text-sm text-red-500 mb-4">
                Must have an Uppercase letter, a lowercase letter, Length must
                be at least 6 character
              </p>
            )}
            <p className="text-sm text-gray-500 mb-4">
              Already have an account? Please{" "}
              <Link to={"/login"} className="text-red-500 font-medium">
                Login
              </Link>
            </p>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
