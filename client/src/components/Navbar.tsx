import React from "react";
import logo from "../assets/images/logo.png";
import { MdDoubleArrow } from "react-icons/md";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-6 px-8 bg-white shadow">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="flex items-center gap-3 rounded-full bg-blue-50 p-1 px-1">
        <p className="p-2 px-10 rounded-full text-white bg-blue-400 font-bold">
          Home
        </p>
        <p className="p-2 px-10 rounded-full ">About Us</p>
        <p className="p-2 px-10 rounded-full ">Help</p>
        <p className="p-2 px-10 rounded-full ">Shift</p>
      </div>
      <div className="flex items-center gap-8 ">
        <button>Login</button>
        <button className="bg-blue-800 text-white font-bold flex items-center gap-1 p-2 px-4 rounded-full">
          <MdDoubleArrow className="text-blue-200" />
          Join Curaflux
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
