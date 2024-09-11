import React from "react";
import logo from "../assets/images/logo.png";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import { ScreenLayout } from "./layout/ScreenLayout";

const Navbar: React.FC = () => {
  return (
    <ScreenLayout>
      <nav className="flex justify-between items-center p-6 px-8 bg-white ">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="md:flex hidden items-center gap-3 rounded-full bg-blue-50 p-1 px-2 ">
          <p className="p-2 px-10 rounded-full text-white bg-blue-400 font-bold">
            Home
          </p>
          <p className="p-2 px-10 rounded-full ">About Us</p>
          <p className="p-2 px-10 rounded-full ">Help</p>
          <p className="p-2 px-10 rounded-full ">Shift</p>
        </div>
        <div className="md:flex hidden items-center gap-8 ">
          <Link to={"/login"}>Login</Link>
          <Link
            to={"/register"}
            className="bg-blue-800 text-white font-bold flex items-center gap-1 p-2 px-4 rounded-full"
          >
            <MdDoubleArrow className="text-blue-200" />
            Join Curaflux
          </Link>
        </div>
      </nav>
    </ScreenLayout>
  );
};

export default Navbar;
