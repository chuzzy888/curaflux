import React, { useState } from "react";
import bi from "../assets/images/bs.jpeg";
import lg from "../assets/images/lg.png";
import instagram from "../assets/images/instagram.png";
import facebook from "../assets/images/facebook.png";
import linkedin from "../assets/images/linkedin.png";
import twitter from "../assets/images/twitter.png";
import threads from "../assets/images/threads.png";
import youtube from "../assets/images/youtube.png";
import profilePic from "../assets/images/blc.jpeg"; // Add your profile picture image
import { IoMdClose } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { Calendar } from "react-calendar"; // You can use any calendar library or component
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePhone } from "react-icons/hi";

function Shift() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
  };
  return (
    <div>
      <div
        className="relative object-cover bg-cover bg-center bg-no-repeat h-screen w-full"
        style={{ backgroundImage: `url(${bi})` }}
      >
        {/* Overlay to darken the background a little for readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative flex flex-col justify-center items-center h-full px-4 lg:px-0">
          {/* Content Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md lg:max-w-lg mx-auto">
            <h2 className="text-xl  font-bold text-gray-700 mb-4">
              Explore <span className="text-blue-500">Perfect Shifts</span>{" "}
              Around <span className="text-green-600">You!</span>
            </h2>

            {/* Location Input */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="location"
                  name="location"
                  className="mr-2"
                  checked
                  readOnly
                />
                <label htmlFor="location" className="text-gray-600">
                  My location
                </label>
              </div>
              <div className="flex mt-4">
                <input
                  type="text"
                  placeholder="Enter Current Location..."
                  className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 outline-none focus:ring-0 border border-l-green-700"
                />
                <button className="bg-blue-600 text-white px-6 py-3  hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap">
                  <span>Find Shifts</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Example Result */}
            <div className="flex items-start">
              <div className="mt-1">
                <input
                  type="radio"
                  id="medicsHospital"
                  name="hospital"
                  className="mr-2"
                />
              </div>
              <label htmlFor="medicsHospital" className="text-gray-700">
                <span className="block font-semibold">
                  Medics Teaching Hospital
                </span>
                <span className="text-gray-500 text-sm">
                  Z3, Ozumba Mbadiwe Ave, Eti-Osa, Lagos, Nigeria
                </span>
              </label>
            </div>
          </div>

          {/* Footer Section */}
          {/* <div className="absolute bottom-0 w-full text-center py-4 text-white font-medium md:block hidden">
            <p>All copyrights reserved</p>
          </div> */}

          {/* Logo */}
          <div className="absolute bottom-4 left-4">
            <img src={lg} alt="Logo" className="h-8" />
          </div>
          <div className="absolute bottom-4 right-4 md:flex space-x-4  hidden">
            <a href="https://instagram.com">
              <img src={instagram} alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="https://facebook.com">
              <img src={facebook} alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com">
              <img src={linkedin} alt="LinkedIn" className="h-6 w-6" />
            </a>
            <a href="https://twitter.com">
              <img src={twitter} alt="Twitter" className="h-6 w-6" />
            </a>
            <a href="https://threads.net">
              <img src={threads} alt="Threads" className="h-6 w-6" />
            </a>
            <a href="https://youtube.com">
              <img src={youtube} alt="YouTube" className="h-6 w-6" />
            </a>
          </div>

          {/* Profile Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleSidebar}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300"
            >
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Sidebar */}
          {/* <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-600"
            >
              <IoMdClose />
            </button>
            <div className="p-8">
              <h2 className="text-lg font-bold">Profile Sidebar</h2>
            </div>
            <div className="absolute bottom-4 left-4 w-full px-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <MdLogout className="h-6 w-6 mr-2" />

                <span>Logout</span>
              </button>
            </div>
          </div> */}
          <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-600"
            >
              <IoMdClose />
            </button>

            {/* Profile Section */}
            <div className="flex items-center p-4 border-b border-gray-200">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full">
                  <FaCheckCircle className="text-white w-4 h-4" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold">John Doe</p>
                <p className="text-gray-600">Nurse</p>
              </div>
            </div>

            {/* Specialties Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold mb-2">Specialties</h3>
              <div className="flex  space-x-4">
                <div className="px-4 py-2 bg-blue-100 rounded">Pediatrics</div>
                <div className="px-4 py-2 bg-blue-100 rounded">Emergency</div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold mb-2">Contact Information</h3>
              <p className="flex items-center gap-1 mb-1">
                <AiOutlineMail />
                john.doe@example.com
              </p>
              <p className="flex items-center gap-1 mb-1">
                <HiOutlinePhone />
                Phone: (123) 456-7890
              </p>
              <p className="flex items-center gap-1 mb-1">
                <IoLocationOutline />
                Location: 123 Main St, Anytown, USA
              </p>
            </div>

            {/* Availability Section */}
            <div className="p-4 ">
              <h3 className="text-lg font-bold mb-2">Availability</h3>
              <Calendar />
            </div>

            {/* Buttons */}
            {/* <div className="p-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2">
                View Full Profile
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Get Verified
              </button>
            </div> */}

            {/* Logout Section */}
            <div className="absolute bottom-0 left-4 w-full px-4 ">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <MdLogout className="h-6 w-6 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shift;
