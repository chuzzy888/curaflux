import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { MdDoubleArrow, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { ScreenLayout } from "./layout/ScreenLayout";
import Cookies from "js-cookie";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  const token = Cookies.get("token");
  const verified = Cookies.get("verified");

  const isAuthenticated = token && verified === "true";

  return (
    <ScreenLayout>
      <nav className="w-full flex justify-between items-center p-6 bg-white">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3 rounded-full bg-blue-50 p-1 px-2">
          <Link
            to={"/"}
            className="p-2 px-6 lg:px-10 rounded-full text-white bg-blue-400 font-bold"
          >
            Home
          </Link>
          <p className="p-2 px-6 lg:px-10 rounded-full font-medium cursor-not-allowed">
            About Us
          </p>
          <p className="p-2 px-6 lg:px-10 rounded-full font-medium cursor-not-allowed">
            Help
          </p>
          <Link
            to={"/shift"}
            className="p-2 px-6 lg:px-10 rounded-full font-medium"
          >
            Shift
          </Link>
        </div>

        {/* Desktop Login/Register */}
        <div className="hidden md:flex items-center gap-4 font-medium lg:gap-8">
          {!isAuthenticated && (
            <>
              <Link to={"/login"}>Login</Link>
              <Link
                to={"/register"}
                className="bg-blue-400 text-white font-bold p-2 px-4 hover:bg-blue-500 rounded-full"
              >
                Join Curaflux
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
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
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
            <ul className="flex flex-col items-center gap-4 p-4">
              <li className="text-blue-800 font-bold">
                <Link to="/" onClick={toggleMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleMobileMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" onClick={toggleMobileMenu}>
                  Help
                </Link>
              </li>
              <li>
                <Link to="/shift" onClick={toggleMobileMenu}>
                  Shift
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                    <Link to="/login" onClick={toggleMobileMenu}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="bg-blue-800 text-white font-bold flex items-center gap-1 p-2 px-4 rounded-full"
                      onClick={toggleMobileMenu}
                    >
                      <MdDoubleArrow className="text-blue-200" />
                      Join CuraFlux
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
