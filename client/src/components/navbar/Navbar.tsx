import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { ScreenLayout } from "../layout/ScreenLayout";
import Cookies from "js-cookie";
import { IoPersonAdd } from "react-icons/io5";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  const token = Cookies.get("locumToken");
  const verified = Cookies.get("locumVerified");

  const isAuthenticated = token && verified === "true";

  return (
    <ScreenLayout>
      <nav className="w-full flex justify-between items-center p-4 md:p-6 bg-white ">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3 rounded-full bg-blue-50 p-1 px-2">
          <Link
            to={"/"}
            className="p-2 px-4 md:px-6 lg:px-8 xl:px-10 rounded-full text-white bg-blue-400 font-bold"
          >
            Home
          </Link>
          <p className="p-2 px-4 md:px-6 lg:px-8 xl:px-10 rounded-full font-medium cursor-not-allowed">
            About Us
          </p>
          <p className="p-2 px-4 md:px-6 lg:px-8 xl:px-10 rounded-full font-medium cursor-not-allowed">
            Help
          </p>
          <Link
            to={"/shift"}
            className="p-2 px-4 md:px-6 lg:px-8 xl:px-10 rounded-full font-medium"
          >
            Shift
          </Link>
        </div>

        {/* Desktop Login/Register */}
        <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-8 font-medium">
          {!isAuthenticated && (
            <>
              <Link to={"/login-role"}>Login</Link>
              <Link
                to={"/choose-role"}
                className=" bg-blue-400  font-bold p-2 px-4 md:px-6 lg:px-4 hover:bg-blue-500 text-white rounded-full  flex items-center gap-2 "
              >
                <IoPersonAdd />
                Join Curaflux
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMobileMenuOpen ? (
              <MdClose size={30} className="text-blue-800" />
            ) : (
              <MdMenu size={30} className="text-blue-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 right-0 w-3/4 md:w-2/3 h-full bg-white shadow-lg z-50 transition-transform transform duration-300 ease-in-out lg:hidden">
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu}>
                <MdClose size={30} className="text-blue-800" />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-8 p-4">
              <li className="text-blue-800 font-bold">
                <Link to="/" onClick={toggleMobileMenu} className="text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={toggleMobileMenu}
                  className="text-lg"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" onClick={toggleMobileMenu} className="text-lg">
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/shift"
                  onClick={toggleMobileMenu}
                  className="text-lg"
                >
                  Shift
                </Link>
              </li>

              {!isAuthenticated && (
                <>
                  <li>
                    <Link to="/login" className="text-lg">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-lg">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </ScreenLayout>
  );
};

export default Navbar;
