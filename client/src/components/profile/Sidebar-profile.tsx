import axios from "axios";
import { useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlinePhone } from "react-icons/hi";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import useAuthStore from "../../redux/store/authStore";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

type profileSidebarTypes = {
  handleLogout: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  userData: {
    userId: string;
    email: string;
    nickName: string;
    gender: string;
    fullName: string;
    birthdate: string;
    nicNumber: string;
  };
};

export const SidebarProfile = ({
  handleLogout,
  toggleSidebar,
  isSidebarOpen,
  userData,
}: profileSidebarTypes) => {
  const { setUserInfo, userInfo } = useAuthStore();

  const getAUserInfo = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/auth/user/${userData.userId}`
      );

      setUserInfo(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAUserInfo();
  }, [userData?.userId]);

  // console.log(userInfo);

  return (
    <main
      className={`fixed top-0 right-0 h-full w-80 bg-gray-200 shadow-lg transition-transform transform animate_animated animate__fadeInRight ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <section className=" bg-blue-400 w-full h-28 relative">
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white "
        >
          <IoMdClose size={20} />
        </button>

        {/* Profile Section */}
        <div className="p-4 absolute -bottom-32 left-[30%]">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-2">
            <img
              src={
                userInfo?.photo ||
                "https://imgs.search.brave.com/2pODr3EgS5gALfXBmOAurXtyMGRVSrH5S4Kffrvx0XY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xNTAt/MTUwMzk0NV90cmFu/c3BhcmVudC11c2Vy/LXBuZy1kZWZhdWx0/LXVzZXItaW1hZ2Ut/cG5nLXBuZy5wbmc"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" mt-3 text-center">
            <p className="text-lg font-bold uppercase">{userInfo.nickName}</p>
            <p className="text-gray-600 capitalize">{userInfo.specialty}</p>
          </div>
        </div>
      </section>

      <section className="mt-32 px-5">
        <div>
          <Link
            to={`/profile/${userInfo.nickName}`}
            className=" font-bold text-sm text-gray-500 hover:underline"
          >
            Profile
          </Link>
        </div>

        <div className=" mt-5 bg-white p-2 rounded-md shadow">
          <h3 className="text-sm font-bold mb-2">Contact Information</h3>
          <a
            className="flex items-center gap-2 mb-1 text-sm"
            href={`mailto:${userInfo.email}`}
          >
            <AiOutlineMail />
            {userData.email}
          </a>
          <p className="flex items-center gap-2 mb-1 text-sm">
            <HiOutlinePhone />
            +234:{" "}
            <a href={`tel:${userInfo.phoneNumber}`}>{userInfo.phoneNumber}</a>
          </p>
        </div>
      </section>

      <section className="mt-4 px-5">
        <div className=" mt-5 bg-white p-2 rounded-md shadow">
          <h3 className="text-sm font-bold mb-2">Professional Registration</h3>
          <p className="flex items-center gap-2 mb-1 text-sm">
            <span>
              {!userInfo.mdcnNumber && !userInfo.nmcnNumber ? (
                <IoMdCloseCircle size={18} color="red" />
              ) : (
                <FaCircleCheck size={15} color="green" />
              )}
            </span>
            {userInfo.mdcnNumber || userInfo.nmcnNumber
              ? `${userInfo.mdcnNumber || ""} ${userInfo.nmcnNumber || ""}`
              : "Not available"}
          </p>

          <p className="flex items-center gap-2 my-2 text-sm">
            <span>
              {!userInfo.identificationNumber ? (
                <IoMdCloseCircle size={18} color="red" />
              ) : (
                <FaCircleCheck size={15} color="green" />
              )}
            </span>
            {userInfo.identificationNumber}
          </p>

          <p className="flex items-center gap-2 my-2 text-sm">
            <span>
              {!userInfo.address ? (
                <IoMdCloseCircle size={18} color="red" />
              ) : (
                <FaCircleCheck size={15} color="green" />
              )}
            </span>
            {userInfo.address || "soon"}
          </p>
        </div>
      </section>

      {/* Logout Section */}
      <div className="absolute bottom-4  w-full  ">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-gray-900 bg-white p-2 rounded-md shadow w-full px-7"
        >
          <MdLogout className="h-6 w-6 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </main>
  );
};
