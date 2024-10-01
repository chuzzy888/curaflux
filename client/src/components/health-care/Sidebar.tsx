import logo from "../../assets/images/logo.png";
import { MdSpaceDashboard } from "react-icons/md";
import { TbBriefcaseFilled } from "react-icons/tb";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-gray-100 h-screen fixed top-0 left-0">
      <div className="p-4">
        <img src={logo} alt="Logo" className="h-8" />
      </div>
      <nav className="mt-6 flex justify-center flex-col gap-8">
        <Link
          to={"#"}
          className="flex items-center mx-3 py-2 px-4 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <p className="mr-3">
            <MdSpaceDashboard className="text-xl" />
          </p>
          Dashboard
        </Link>
        <Link
          to={"#"}
          className="flex items-center mx-3 py-2 px-4 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <p className="mr-3">
            <TbBriefcaseFilled className="text-xl" />
          </p>
          Locums
        </Link>
        <Link
          to={""}
          className="flex items-center mx-3 py-2 px-4 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <p className="mr-3">
            <BiSolidMessageDetail className="text-xl" />
          </p>
          Applications
        </Link>
        <Link
          to={"#"}
          className="flex items-center mx-3 py-2 px-4 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <p className="mr-3">
            <IoSettings className="text-xl" />
          </p>
          Settings
        </Link>
      </nav>
      <div className="absolute bottom-0 left-0 w-full p-4">
        <button
          className="flex items-center py-2 px-4 text-gray-700 "
          onClick={() => {
            Cookies.remove("healthcareToken");
            navigate("/register/healthcare");
          }}
        >
          <p className="mr-3">
            <MdLogout />
          </p>
          Logout
        </button>
      </div>
    </div>
  );
}
