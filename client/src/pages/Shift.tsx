import { useState, useEffect } from "react";
import { shifts } from "./shiftData";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../redux/store/authStore";
import mapImage from "../assets/images/mbi.png";
import clg from "../assets/images/clg.png";
import instagram from "../assets/images/instagram.png";
import facebook from "../assets/images/facebook.png";
import linkedin from "../assets/images/linkedin.png";
import twitter from "../assets/images/twitter.png";
import threads from "../assets/images/threads.png";
import youtube from "../assets/images/youtube.png";
import { ScreenLayout } from "../components/layout/ScreenLayout";
import { GoArrowRight } from "react-icons/go";

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
  const [loadingState, setLoadingState] = useState<string>("");
  const [hospitalData, setHospitalData] = useState<HospitalData | null>(null);
  const [location, setLocation] = useState<string>("");
  const navigate = useNavigate();

  const { userInfo } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Set user data here (omitted for brevity)
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleFindShifts = () => {
    if (!location.trim()) {
      alert("Please enter your location.");
      return;
    }
    setLoadingState("Searching for available shifts...");
    setTimeout(() => {
      setLoadingState("Finding nearest shifts...");
      setTimeout(() => {
        const randomShift = shifts[Math.floor(Math.random() * shifts.length)];
        setHospitalData(randomShift);
        setLoadingState("");
      }, 3000);
    }, 3000);
  };

  return (
    <ScreenLayout>
      <div className="relative min-h-screen bg-gray-100">
        {/* Map Section */}
        <div className="relative h-64">
          <img
            src={mapImage} // Replace with an actual map or map service like Google Maps if necessary
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Search Box */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800">
            Discovering <span className="text-blue-500">Ideal Shifts</span> Near{" "}
            <span className="text-green-600">You!</span>
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
              onChange={e => setLocation(e.target.value)}
              value={location}
              placeholder="Enter Current Location Or Nearest Landmark.."
              className="w-1/2 p-3 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleFindShifts}
              className="bg-blue-500 text-white px-8 py-3 flex items-center gap-2 rounded-r-full hover:bg-blue-600 transition-all duration-300"
            >
              Search
              <GoArrowRight />
            </button>
          </div>

          {/* Loading and Shift Display */}
          {loadingState ? (
            <div className="mt-4 text-center text-gray-600">{loadingState}</div>
          ) : (
            hospitalData && (
              <div className="mt-6 p-4 bg-gray-50 border rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">
                  {hospitalData.name}
                </h3>
                <p className="text-gray-600">{hospitalData.location}</p>
                <p className="text-gray-500 mt-2">
                  {hospitalData.specialization} | Pay Rate:{" "}
                  {hospitalData.payRate}
                </p>
                <Link
                  to={`/shift-details/${hospitalData.id}`}
                  className="inline-block mt-4 text-blue-500 underline"
                >
                  View Details
                </Link>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full flex justify-between items-center py-4 bg-white border-t">
          <div className="ml-6">
            <img src={clg} alt="Logo" className="h-8" />
          </div>
          <p className="text-gray-600 text-sm text-center  hidden md:block">
            All copyrights reserved
          </p>
          <div className="flex space-x-4 mr-6">
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
      </div>
    </ScreenLayout>
  );
}

export default Shift;
