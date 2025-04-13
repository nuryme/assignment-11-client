import { Link, NavLink } from "react-router-dom";
import logo from "../assets/image-removebg-preview.png";
import useAuthHook from "../hooks/useAuthHook";

const Navbar = () => {
  const { user, handleLogOut,  } = useAuthHook();
  // console.log(name)


  return (
    <div className="navbar max-w-10/12 mx-auto  ">
      <div className="flex-1">
        <Link to={'/'}>
          <img width={150} src={logo} alt="" />
        </Link>
      </div>
      <div className="flex gap-2">
        <ul className="menu menu-horizontal px-1 font-bold items-center menuBar">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/allItems"}>Lost & Found Items</NavLink>
          </li>
          {!user && (
            <li className="">
              <NavLink className="bg-transparent p-0 ml-2 " to={"/login"}>
                <button className="primaryBtn cursor-pointer">Login</button>
              </NavLink>
            </li>
          )}
        </ul>
        {user && (
          <div className=" flex items-center gap-2 font-bold">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                    title={user.email}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to={"/addItems"} className="justify-between">
                    Add lost & found item
                  </NavLink>
                </li>
                <li>
                  <Link to={'/allRecovered'}>All Recovered Items</Link>
                </li>
                <li>
                  <Link to={'/myItems'}>Manage My Items</Link>
                </li>
              </ul>
            </div>

            <ul>
              <li>
                <Link onClick={handleLogOut}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
