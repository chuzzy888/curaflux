import { useState, useEffect } from "react";
// import { shifts } from "./shiftData";
import mapImage from "../../assets/images/bs.jpeg";
import clg from "../../assets/images/lg.png";
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
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { GoArrowRight } from "react-icons/go";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

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

//   hospital: {
//     hospitalName: string;
//   };
// }

interface ShiftSearchResult {
  hospital: {
    hospitalName: string;
  };
  _id: number;
  name: string;
  location: string;
  // Add other properties as needed
}

function Shift() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ShiftSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
   const [error, setError] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    const token = Cookies.get("locumToken");
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


  const handleSearch = async () => {
    if (!location.trim()) {
      alert("Please enter your location.");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/hospital/q/shifts?location=${location}`
      );
      setSearchResults(data.search);
      setShowDropdown(true);
      setError(null); // Clear any previous error when search is successful
    } catch (error: any) {
      if (error.response && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to clear the error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000); // Clear error after 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount or error change
    }
  }, [error]);
  

  // Dropdown setup and routing
  interface DropdownOption {
    name: string;
    code: string;
  }

  console.log(searchResults);

  const [selectedCity, setSelectedCity] = useState<DropdownOption | null>(null);

  const cities: DropdownOption[] = [
    { name: "Discover", code: "go-live" },
    { name: "Shift For You", code: "shift-for-you" },
  ];

  const handleDropdownChange = (e: { value: DropdownOption }) => {
    setSelectedCity(e.value);

    if (e.value.code === "go-live") {
      navigate("/shift");
    } else if (e.value.code === "shift-for-you") {
      navigate("/shift-for-you");
    }
  };

  const handleLogout = () => {
    Cookies.remove("locumToken");
    Cookies.remove("locumVerified");
    window.location.href = "/";
  };

  return (
    <ScreenLayout>
      <div className="relative min-h-screen bg-gray-100">
        <div className="relative h-64 md:h-96">
          <img
            src={mapImage}
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Dropdown Button */}
        <div className="absolute top-0 left-16 transform -translate-x-1/2 p-2 mx-8 rounded-lg">
          <div className="card flex justify-content-center border border-gray-400">
            <Dropdown
              value={selectedCity}
              onChange={handleDropdownChange}
              options={cities}
              optionLabel="name"
              placeholder="Select Mode"
              className="w-full md:w-14rem"
            />
          </div>
        </div>

        {/* Content Box */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-md md:text-xl font-semibold text-gray-800">
            Discovering <span className="text-blue-500">Ideal Shifts</span> Near{" "}
            <span className="">You!</span>
          </h2>

          {/* Location Input */}
          <div className="mt-4 flex items-center">
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
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              placeholder="Enter Current Location Or Nearest Landmark.."
              className="md:w-1/2 w-full p-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white md:px-8 px-4 py-3 flex items-center gap-2 rounded-r-full hover:bg-blue-600 transition-all duration-300"
            >
              Search
              <GoArrowRight />
            </button>
          </div>
          {error && (
            <div className="p-4 mt-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
              {error}
            </div>
          )}

          {/* Search Results Dropdown */}
          {showDropdown && (
            <div className="mt-4 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-600">Loading...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result._id}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <Link to={`/shifts/${result._id}`}>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {result.hospital.hospitalName}
                      </h3>
                      <p className="text-gray-600">{result.location}</p>
                      {/* Add more details as needed */}
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-600">
                  No results found
                </div>
              )}
            </div>
          )}
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

        {/* Footer Section */}
        <footer className="absolute bottom-0 w-full flex justify-between items-center py-4 bg-white border-t">
          <div className="">
            <img src={clg} alt="Logo" className="h-8" />
          </div>
          <p className="text-gray-600 text-sm text-center hidden md:block">
            All copyrights reserved
          </p>
          <div className="flex space-x-4 ">
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
        </footer>

        {/* Sidebar */}
        <SidebarProfile
          handleLogout={handleLogout}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          userData={userData}
        />
      </div>
    </ScreenLayout>
  );
}

export default Shift;
