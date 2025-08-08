import { Link } from "react-router";
import Navlinks from "./Navlinks";
import { useAuth } from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful.");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, you can show a toast notification or alert here
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <Navlinks />
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Garden Connect</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Navlinks />
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end realative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom before:z-[9999] right-10"
              data-tip={user.displayName || user.email}
            >
              <div className="w-10 rounded-full ">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="object-cover w-10 h-10 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-40 p-2 shadow"
            >
              <li>
                <button
                  className="btn btn-error btn-sm w-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login/SignUp
          </Link>
        )}
      </div>
    </div>
  );
}
