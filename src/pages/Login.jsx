import loginData from "../assets/lottie/login.json";
import useAuthHook from "../hooks/useAuthHook";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin, setUser, handleGoogleLogin } = useAuthHook();
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);

    handleLogin(data.email, data.password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login Successful", { icon: "👏" });
         navigate(from, {replace: true})
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogle = () => {
    handleGoogleLogin()
    .then((res) => {
      setUser(res.user)
      toast.success("Login Successful", { icon: "👏" });
      navigate(from, {replace: true})
    }
    )
    .catch((err) => toast.error(err.message));
}
  

  return (
    <div className="p-6">
      <h1 className=" text-center primaryColor">Please Login</h1>

      <Link onClick={handleGoogle
      } className="flex justify-center mt-12 mb-4">
        <button className="bg-gray-100 border-blue-500 border-2 rounded-3xl text-blue-500 font-medium px-12 py-2 flex gap-2 items-center cursor-pointer">
          Login with
          <img
            width={20}
            src="https://i.pinimg.com/736x/f5/a0/de/f5a0de50d81d983c2dd5375e22a2c4ea.jpg"
            alt=""
          />
        </button>
      </Link>

      <div className="flex flex-row-reverse lg:flex-row justify-center gap-12">
        <div className="mb-8">
          <div style={{ width: "500px", height: "500px" }}>
            <Lottie animationData={loginData} loop={true} autoplay={true} />
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="mt-10  min-w-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <p className="text-sm text-gray-500 mb-4">
              Don't have an account? Please{" "}
              <Link to={"/register"} className="text-red-500 font-medium">
                Register
              </Link>
            </p>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
           >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
