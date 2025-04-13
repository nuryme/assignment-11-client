import { Navigate, useLocation } from "react-router-dom";
import useAuthHook from "../hooks/useAuthHook";
import Loading from "../pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthHook();

  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;
