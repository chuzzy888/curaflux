import { useState, useEffect } from "react";
import { shifts } from "./shiftData";
import bi from "../../assets/images/bs.jpeg";
import lg from "../../assets/images/lg.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/facebook.png";
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";
import threads from "../../assets/images/threads.png";
import youtube from "../../assets/images/youtube.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { SidebarProfile } from "../../components/profile/Sidebar-profile";
import useAuthStore from "../../redux/store/authStore";

interface HospitalData {
  name: string;
  location: string;
  id: number;
  payRate: string;
  specialization: string;
  duration: string;
  jobDescription: string;
  date: string;
  skills: string[];
}

function Shift() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingState, setLoadingState] = useState<string>("");
  const [hospitalData, setHospitalData] = useState<HospitalData | null>(null);
  const [location, setLocation] = useState<string>("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    Cookies.remove("token");
    navigate("/");
  };
  interface DecodedToken {
    userId: string;
    email: string;
    nickName: string;
    gender: string;
    fullName: string;
    birthdate: string;
    nicNumber: string;
  }
  const [userData, setUserData] = useState({
    userId: "",
    email: "",
    nickName: "",
    gender: "",
    fullName: "",
    birthdate: "",
    nicNumber: "",
  });

  const { userInfo } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        setUserData({
          userId: decodedToken.userId,
          email: decodedToken.email,
          nickName: decodedToken.nickName,
          gender: decodedToken.gender,
          fullName: decodedToken.fullName,
          birthdate: decodedToken.birthdate,
          nicNumber: decodedToken?.nicNumber,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("No token found. Redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);
  const handleFindShifts = () => {
    if (!location.trim()) {
      alert("Please enter your location.");
      return;
    }
    setLoadingState("Awaiting available shifts...");
    setTimeout(() => {
      setLoadingState("Connecting you with nearest available shift...");
      setTimeout(() => {
        setLoadingState("Almost done...");
        setTimeout(() => {
          const randomShift = shifts[Math.floor(Math.random() * shifts.length)];
          setHospitalData(randomShift);
          setLoadingState("");
        }, 4000);
      }, 4000);
    }, 4000);
  };

  return (
    <div>
      <div
        className="relative object-cover bg-cover bg-center bg-no-repeat h-screen w-full"
        style={{ backgroundImage: `url(${bi})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative flex flex-col justify-center items-center h-full px-4 lg:px-0">
          {/* Content Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md lg:max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Explore <span className="text-blue-500"> Shifts</span> Around{" "}
              <span className="text-green-600">You!</span>
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
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  placeholder="Enter Current Location"
                  className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0 border-l-green-700"
                />
                <button
                  onClick={handleFindShifts}
                  className="bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap"
                >
                  <span className="md:flex hidden">Find Shifts</span>
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

            {/* Loading State */}
            {loadingState && (
              <div className="mb-6 text-center text-gray-700 flex justify-center items-center gap-5 flex-col ">
                <div className="loader"> </div>
                <div className="loading-message  p-2 rounded-sm">
                  <p>{loadingState}</p>
                </div>
              </div>
            )}

            {/* Example Result */}
            {!loadingState && hospitalData && (
              <div className="flex items-start">
                <div className="mt-1">
                  <input
                    type="radio"
                    id="medicsHospital"
                    name="hospital"
                    className="mr-2"
                  />
                </div>
                {/* <label htmlFor="medicsHospital" className="text-gray-700">
                  <span className="block font-semibold">
                    {hospitalData.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {hospitalData.location}
                  </span>
                </label> */}
                <label
                  htmlFor={`hospital-${hospitalData.id}`}
                  className="text-gray-700"
                >
                  <Link to={`/shift-details/${hospitalData.id}`}>
                    <span className="block font-semibold">
                      {hospitalData.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {hospitalData.location}
                    </span>
                  </Link>
                </label>
              </div>
            )}
          </div>

          {/* Footer Section */}
          {/* <div className="absolute bottom-0 w-full text-center py-4 text-white font-medium md:block hidden">
            <p>All copyrights reserved</p>
          </div> */}

          {/* Logo */}
          <div className="absolute bottom-4 left-4">
            <img src={lg} alt="Logo" className="h-8" />
          </div>
          <div className="absolute bottom-4 right-4 md:flex space-x-4 hidden">
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
                src={userInfo?.photo}
                alt="Profile-image"
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Sidebar */}
          <SidebarProfile
            handleLogout={handleLogout}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            userData={userData}
          />
        </div>
      </div>
    </div>
  );
}

export default Shift;
