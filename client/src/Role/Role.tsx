import user from "../assets/images/user.png";
import hlct from "../assets/images/hlct.png";
// import bg from "../assets/images/sd.jpg";
import { Link } from "react-router-dom";
import AuthFooter from "../components/footer/AuthFooter";

export default function Role() {
  return (
    <div
      className="flex flex-col items-center font-serif justify-center h-screen bg-gray-50"
      style={
        {
          // backgroundImage: `url(${bg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
          // backgroundBlendMode: "darken",
        }
      }
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg  max-w-screen-lg w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          Are you a <span className="text-blue-400">Locum</span> or a{" "}
          <span className="text-blue-400">Healthcare Facility</span>?
        </h1>
        <p className="text-gray-500 mb-8 text-sm sm:text-base text-center">
          Sign up to get started.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Locum Card */}
          <div className="bg-white p-6 rounded-xl  border flex flex-col items-center text-center">
            <img src={user} alt="Locum Icon" className="h-16 mb-4" />
            <h2 className="font-bold text-xl sm:text-2xl text-gray-800 mb-2">
              I am a Locum
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Looking for flexible shifts at hospitals or clinics? Join our
              platform and offer your services on-demand. Work when and where
              you want.
            </p>
            <Link to={"/register"}>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Healthcare Facility Card */}
          <div className="bg-white p-6 rounded-xl border flex flex-col items-center text-center">
            <img
              src={hlct}
              alt="Healthcare Facility Icon"
              className="h-16 mb-4"
            />
            <h2 className="font-bold text-xl sm:text-2xl text-gray-800 mb-2">
              I am a Healthcare Facility
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Need healthcare professionals for shifts? Register your facility
              and hire qualified locum professionals with ease.
            </p>
            <Link to={"/register/healthcare"}>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <AuthFooter />
      </div>
    </div>
  );
}
