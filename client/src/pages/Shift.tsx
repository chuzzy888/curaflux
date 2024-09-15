// import React, { useState, useEffect } from "react";
// import { shifts } from "./shiftData";
// import bi from "../assets/images/bs.jpeg";
// import lg from "../assets/images/lg.png";
// import instagram from "../assets/images/instagram.png";
// import facebook from "../assets/images/facebook.png";
// import linkedin from "../assets/images/linkedin.png";
// import twitter from "../assets/images/twitter.png";
// import threads from "../assets/images/threads.png";
// import youtube from "../assets/images/youtube.png";
// import profilePic from "../assets/images/blc.jpeg";
// import { IoMdClose } from "react-icons/io";
// import { MdLogout } from "react-icons/md";
// // import { Calendar } from "react-calendar";
// import { FaCheckCircle, FaRegCalendarCheck } from "react-icons/fa";
// import { AiOutlineMail } from "react-icons/ai";
// import { IoLocationOutline } from "react-icons/io5";
// import { HiOutlinePhone } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";

// interface HospitalData {
//   name: string;
//   location: string;
//   id: number;
//   payRate: string;
//   specialization: string;
//   duration: string;
//   jobDescription: string;
//   date: string;
//   skills: string[];
// }

// function Shift() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loadingState, setLoadingState] = useState<string>("");
//   const [hospitalData, setHospitalData] = useState<HospitalData | null>(null);
//   const [location, setLocation] = useState<string>("");
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = () => {
//     // Handle logout logic here
//     Cookies.remove("token");
//     navigate("/");
//   };

//   const [userData, setUserData] = useState({
//     email: "",
//     nickName: "",
//   });

//   useEffect(() => {
//     // Assuming you get the user ID after login or signup
//     const userId = "66e5a556b2774f645a415653"; // Example userId, should be dynamic based on the logged-in user

//     axios
//       .get(`https://curaflux-server.onrender.com/auth/users/${userId}`)
//       .then(response => {
//         const user = response.data.user[0]; // Adjust according to actual response structure
//         setUserData({
//           email: user.email,
//           nickName: user.nickName,
//         });
//       })
//       .catch(error => console.error("Error fetching user data:", error));
//   }, []);

//   const handleFindShifts = () => {
//     if (!location.trim()) {
//       alert("Please enter your location.");
//       return;
//     }
//     setLoadingState("Awaiting available shifts...");
//     setTimeout(() => {
//       setLoadingState("Connecting you with nearest available shift...");
//       setTimeout(() => {
//         setLoadingState("Almost done...");
//         setTimeout(() => {
//           // Randomly select one shift from the imported data
//           const randomShift = shifts[Math.floor(Math.random() * shifts.length)];
//           setHospitalData(randomShift);
//           setLoadingState("");
//         }, 4000);
//       }, 4000);
//     }, 4000);
//   };

//   return (
//     <div>
//       <div
//         className="relative object-cover bg-cover bg-center bg-no-repeat h-screen w-full"
//         style={{ backgroundImage: `url(${bi})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-30"></div>

//         <div className="relative flex flex-col justify-center items-center h-full px-4 lg:px-0">
//           {/* Content Box */}
//           <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md lg:max-w-lg mx-auto">
//             <h2 className="text-xl font-bold text-gray-700 mb-4">
//               Explore <span className="text-blue-500"> Shifts</span> Around{" "}
//               <span className="text-green-600">You!</span>
//             </h2>

//             {/* Location Input */}
//             <div className="mb-6">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id="location"
//                   name="location"
//                   className="mr-2"
//                   checked
//                   readOnly
//                 />
//                 <label htmlFor="location" className="text-gray-600">
//                   My location
//                 </label>
//               </div>
//               <div className="flex mt-4">
//                 <input
//                   type="text"
//                   onChange={e => setLocation(e.target.value)}
//                   value={location}
//                   placeholder="Enter Current Location"
//                   className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0 border-l-green-700"
//                 />
//                 <button
//                   onClick={handleFindShifts}
//                   className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap"
//                 >
//                   <span className="md:flex hidden">Find Shifts</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M14 5l7 7m0 0l-7 7m7-7H3"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Loading State */}
//             {loadingState && (
//               <div className="mb-6 text-center text-gray-700 flex justify-center items-center gap-5 flex-col ">
//                 <div className="loader"> </div>
//                 <div className="loading-message  p-2 rounded-sm">
//                   <p>{loadingState}</p>
//                 </div>
//               </div>
//             )}

//             {/* Example Result */}
//             {!loadingState && hospitalData && (
//               <div className="flex items-start">
//                 <div className="mt-1">
//                   <input
//                     type="radio"
//                     id="medicsHospital"
//                     name="hospital"
//                     className="mr-2"
//                   />
//                 </div>
//                 {/* <label htmlFor="medicsHospital" className="text-gray-700">
//                   <span className="block font-semibold">
//                     {hospitalData.name}
//                   </span>
//                   <span className="text-gray-500 text-sm">
//                     {hospitalData.location}
//                   </span>
//                 </label> */}
//                 <label
//                   htmlFor={`hospital-${hospitalData.id}`}
//                   className="text-gray-700"
//                 >
//                   <Link to={`/shift-details/${hospitalData.id}`}>
//                     <span className="block font-semibold">
//                       {hospitalData.name}
//                     </span>
//                     <span className="text-gray-500 text-sm">
//                       {hospitalData.location}
//                     </span>
//                   </Link>
//                 </label>
//               </div>
//             )}
//           </div>

//           {/* Footer Section */}
//           {/* <div className="absolute bottom-0 w-full text-center py-4 text-white font-medium md:block hidden">
//             <p>All copyrights reserved</p>
//           </div> */}

//           {/* Logo */}
//           <div className="absolute bottom-4 left-4">
//             <img src={lg} alt="Logo" className="h-8" />
//           </div>
//           <div className="absolute bottom-4 right-4 md:flex space-x-4 hidden">
//             <a href="https://instagram.com">
//               <img src={instagram} alt="Instagram" className="h-6 w-6" />
//             </a>
//             <a href="https://facebook.com">
//               <img src={facebook} alt="Facebook" className="h-6 w-6" />
//             </a>
//             <a href="https://linkedin.com">
//               <img src={linkedin} alt="LinkedIn" className="h-6 w-6" />
//             </a>
//             <a href="https://twitter.com">
//               <img src={twitter} alt="Twitter" className="h-6 w-6" />
//             </a>
//             <a href="https://threads.net">
//               <img src={threads} alt="Threads" className="h-6 w-6" />
//             </a>
//             <a href="https://youtube.com">
//               <img src={youtube} alt="YouTube" className="h-6 w-6" />
//             </a>
//           </div>

//           {/* Profile Button */}
//           <div className="absolute top-4 right-4">
//             <button
//               onClick={toggleSidebar}
//               className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300"
//             >
//               <img
//                 src={profilePic}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           </div>

//           {/* Sidebar */}
//           <div
//             className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform transform animate_animated animate__fadeInRight ${
//               isSidebarOpen ? "translate-x-0" : "translate-x-full"
//             }`}
//           >
//             <button
//               onClick={toggleSidebar}
//               className="absolute top-4 right-4 text-gray-600 "
//             >
//               <IoMdClose />
//             </button>

//             {/* Profile Section */}
//             <div className="flex items-center p-4 border-b border-gray-200">
//               <div className="relative w-16 h-16 rounded-full overflow-hidden">
//                 <img
//                   src={profilePic}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full">
//                   <FaCheckCircle className="text-white w-4 h-4" />
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <p className="text-lg font-bold">{userData.email}</p>
//                 <p className="text-gray-600">Nurse</p>
//               </div>
//             </div>

//             {/* Specialties Section */}
//             <div className="p-4 border-b border-gray-200">
//               <h3 className="text-lg font-bold mb-2">Specialties</h3>
//               <div className="flex  space-x-4">
//                 <div className="px-4 py-2 bg-blue-100 rounded">Pediatrics</div>
//                 <div className="px-4 py-2 bg-blue-100 rounded">Emergency</div>
//               </div>
//             </div>

//             {/* Contact Information Section */}
//             <div className="p-4 border-b border-gray-200">
//               <h3 className="text-lg font-bold mb-2">Contact Information</h3>
//               <p className="flex items-center gap-1 mb-1">
//                 <AiOutlineMail />
//                 john.doe@example.com
//               </p>
//               <p className="flex items-center gap-1 mb-1">
//                 <HiOutlinePhone />
//                 Phone: (123) 456-7890
//               </p>
//               <p className="flex items-center gap-1 mb-1">
//                 <IoLocationOutline />
//                 Location: 123 Main St, Anytown, USA
//               </p>
//             </div>

//             {/* Availability Section */}
//             {/* <div className="p-4 ">
//               <h3 className="text-lg font-bold mb-2">Availability</h3>
//               <Calendar />
//             </div> */}
//             <div className="flex gap-5 items-center p-4">
//               <button className="bg-slate-900 p-2 text-white font-bold flex items-center gap-1  rounded-md">
//                 <FaRegCalendarCheck />
//                 My availability
//               </button>
//               <button className="bg-green-500 p-2 text-white font-bold hover:bg-green-600  rounded-md">
//                 Get Verified
//               </button>
//             </div>

//             {/* Buttons */}
//             {/* <div className="p-4">
//               <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2">
//                 View Full Profile
//               </button>
//               <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//                 Get Verified
//               </button>
//             </div> */}

//             {/* Logout Section */}
//             <div className="absolute bottom-4 left-4 w-full px-4 ">
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center text-gray-600 hover:text-gray-900"
//               >
//                 <MdLogout className="h-6 w-6 mr-2" />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shift;

import React, { useState, useEffect } from "react";
import profilePic from "../assets/images/blc.jpeg";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlinePhone } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Shift() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    nickName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userId = "66e5d5d1f62b7e8c35e47c1c"; // This should be dynamic based on the logged-in user
    const token = Cookies.get("token"); // Retrieve the token from cookies

    if (token) {
      axios
        .get(`https://curaflux-server.onrender.com/auth/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        })
        .then(response => {
          const user = response.data.user[0]; // Adjust according to actual response structure
          setUserData({
            email: user.email,
            nickName: user.nickName,
          });
        })
        .catch(error => console.error("Error fetching user data:", error));
    } else {
      console.error("No token found");
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform transform animate_animated animate__fadeInRight ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-600 "
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
            {/* Display user nickname */}
            <p className="text-lg font-bold">
              {userData.nickName || "John Doe"}
            </p>
            <p className="text-gray-600">Nurse</p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold mb-2">Contact Information</h3>
          <p className="flex items-center gap-1 mb-1">
            <AiOutlineMail />
            {userData.email || "john.doe@example.com"}
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

        {/* Logout Section */}
        <div className="absolute bottom-4 left-4 w-full px-4 ">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <MdLogout className="h-6 w-6" />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shift;
