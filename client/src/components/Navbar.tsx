import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { MdDoubleArrow, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { ScreenLayout } from "./layout/ScreenLayout";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <ScreenLayout>
      <nav className="w-full flex justify-between items-center p-6 bg-white">
        <div>
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <div className="hidden md:flex items-center gap-3 rounded-full bg-blue-50 p-1 px-2">
          <p className="p-2 px-6 lg:px-10 rounded-full text-white bg-blue-400 font-bold">
            Home
          </p>
          <p className="p-2 px-6 lg:px-10 rounded-full font-medium">About Us</p>
          <p className="p-2 px-6 lg:px-10 rounded-full font-medium">Help</p>
          <p className="p-2 px-6 lg:px-10 rounded-full font-medium">Shift</p>
        </div>

        <div className="hidden md:flex items-center gap-4 font-medium lg:gap-8">
          <Link to={"/login"}>Login</Link>

          <Link
            to={"/register"}
            className="bg-blue-400 text-white font-bold p-2 px-4 hover:bg-blue-500 rounded-full"
          >
            Join Curaflux
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <MdClose size={30} className="text-blue-800" />
            ) : (
              <MdMenu size={30} className="text-blue-800" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
            <ul className="flex flex-col items-center gap-4 p-4">
              <li className="text-blue-800 font-bold">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>
                <Link to="/shift">Shift</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-blue-800 text-white font-bold flex items-center gap-1 p-2 px-4 rounded-full"
                >
                  <MdDoubleArrow className="text-blue-200" />
                  Join CuraFlux
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </ScreenLayout>
  );
};

export default Navbar;
